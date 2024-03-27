import {
  escapePointer,
  parseRef,
} from "@redocly/openapi-core/lib/ref-utils.js";
import c from "ansi-colors";
import supportsColor from "supports-color";
import ts from "typescript";
import type {
  DiscriminatorObject,
  OpenAPI3,
  OpenAPITSOptions,
  ReferenceObject,
  SchemaObject,
} from "../types.js";
import { tsLiteral, tsModifiers, tsPropertyIndex } from "./ts.js";

if (!supportsColor.stdout || supportsColor.stdout.hasBasic === false) {
  c.enabled = false;
}

const DEBUG_GROUPS: Record<string, c.StyleFunction | undefined> = {
  redoc: c.cyanBright,
  lint: c.yellowBright,
  bundle: c.magentaBright,
  ts: c.blueBright,
};

export { c };

/** Given a discriminator object, get the property name */
export function createDiscriminatorProperty(
  discriminator: DiscriminatorObject,
  { path, readonly = false }: { path: string; readonly?: boolean },
): ts.TypeElement {
  // get the inferred propertyName value from the last section of the path (as the spec suggests to do)
  let value = parseRef(path).pointer.pop()!;
  // if mapping, and there’s a match, use this rather than the inferred name
  if (discriminator.mapping) {
    // Mapping value can either be a fully-qualified ref (#/components/schemas/XYZ) or a schema name (XYZ)
    const matchedValue = Object.entries(discriminator.mapping).find(
      ([, v]) =>
        (!v.startsWith("#") && v === value) ||
        (v.startsWith("#") && parseRef(v).pointer.pop() === value),
    );
    if (matchedValue) {
      value = matchedValue[0]; // why was this designed backwards!?
    }
  }
  return ts.factory.createPropertySignature(
    /* modifiers     */ tsModifiers({
      readonly,
    }),
    /* name          */ tsPropertyIndex(discriminator.propertyName),
    /* questionToken */ undefined,
    /* type          */ tsLiteral(value),
  );
}

/** Create a $ref pointer (even from other $refs) */
export function createRef(parts: (number | string)[]): string {
  let pointer = "#";
  for (const part of parts) {
    if (!part) {
      continue;
    }
    const maybeRef = parseRef(String(part)).pointer;
    if (maybeRef.length) {
      for (const refPart of maybeRef) {
        pointer += `/${escapePointer(refPart)}`;
      }
    } else {
      pointer += `/${escapePointer(part)}`;
    }
  }
  return pointer;
}

/** Print debug message (cribbed from the `debug` package, but without all the bells & whistles */
export function debug(msg: string, group?: string, time?: number) {
  if (
    process.env.DEBUG &&
    (!group ||
      process.env.DEBUG === "*" ||
      process.env.DEBUG === "openapi-ts:*" ||
      process.env.DEBUG.toLocaleLowerCase() ===
        `openapi-ts:${group.toLocaleLowerCase()}`)
  ) {
    const groupColor = (group && DEBUG_GROUPS[group]) || c.whiteBright;
    const groupName = groupColor(`openapi-ts:${group ?? "info"}`);
    let timeFormatted = "";
    if (typeof time === "number") {
      timeFormatted = c.green(` ${formatTime(time)} `);
    }
    // eslint-disable-next-line no-console
    console.debug(`  ${c.bold(groupName)}${timeFormatted}${msg}`);
  }
}

/** Print error message */
export function error(msg: string) {
  console.error(c.red(` ✘  ${msg}`)); // eslint-disable-line no-console
}

/** Format a performance log in a friendly format */
export function formatTime(t: number) {
  if (typeof t === "number") {
    if (t < 1000) {
      return `${Math.round(10 * t) / 10}ms`;
    } else if (t < 60000) {
      return `${Math.round(t / 100) / 10}s`;
    }
    return `${Math.round(t / 6000) / 10}m`;
  }
  return t;
}

/** Call Object.entries() and optionally sort */
export function getEntries<T>(
  obj: ArrayLike<T> | Record<string, T>,
  options?: {
    alphabetize?: boolean;
    excludeDeprecated?: boolean;
  },
) {
  let entries = Object.entries(obj);
  if (options?.alphabetize) {
    entries.sort(([a], [b]) => a.localeCompare(b, "en-us", { numeric: true }));
  }
  if (options?.excludeDeprecated) {
    entries = entries.filter(
      ([, v]) =>
        !(v && typeof v === "object" && "deprecated" in v && v.deprecated),
    );
  }
  return entries;
}

/* eslint-disable @typescript-eslint/no-explicit-any */
/** resolve a $ref in a schema */
export function resolveRef<T>(
  schema: any,
  $ref: string,
  { silent = false, visited = [] }: { silent: boolean; visited?: string[] },
): T | undefined {
  const { pointer } = parseRef($ref);
  if (!pointer.length) {
    return undefined;
  }
  let node = schema;
  for (const key of pointer) {
    if (node && typeof node === "object" && node[key]) {
      node = node[key];
    } else {
      warn(`Could not resolve $ref "${$ref}"`, silent);
      return undefined;
    }
  }

  // if this is also a $ref, keep tracing
  if (node && typeof node === "object" && node.$ref) {
    if (visited.includes(node.$ref)) {
      warn(`Could not resolve circular $ref "${$ref}"`, silent);
      return undefined;
    }
    return resolveRef(schema, node.$ref, {
      silent,
      visited: [...visited, node.$ref],
    });
  }

  return node;
}

function createDiscriminatorEnum(
  values: string[],
  prevSchema?: SchemaObject,
): SchemaObject {
  return {
    type: "string",
    enum: values,
    description: prevSchema?.description
      ? `${prevSchema.description} (enum property replaced by openapi-typescript)`
      : `discriminator enum property added by openapi-typescript`,
  };
}

type InternalDiscriminatorMapping = Record<
  string,
  { inferred?: string; defined?: string[] }
>;

/** Return a key–value map of discriminator objects found in a schema */
export function scanDiscriminators(
  schema: OpenAPI3,
  options: OpenAPITSOptions,
) {
  // all discriminator objects found in the schema
  const objects: Record<string, DiscriminatorObject> = {};

  // refs of all mapped schema objects we have successfully handled to infer the discriminator enum value
  const refsHandled: string[] = [];

  // perform 2 passes: first, collect all discriminator definitions and handle oneOf and mappings
  walk(schema, (obj, path) => {
    const discriminator = obj?.discriminator as DiscriminatorObject | undefined;
    if (!discriminator?.propertyName) {
      return;
    }

    // collect discriminator object for later usage
    const ref = createRef(path);

    objects[ref] = discriminator;

    // if a mapping is available we will help Typescript to infer properties by adding the discriminator enum with its single mapped value to each schema
    // we only handle the mapping in advance for discriminator + oneOf compositions right now
    if (!obj?.oneOf || !Array.isArray(obj.oneOf)) {
      return;
    }

    const oneOf: (SchemaObject | ReferenceObject)[] = obj.oneOf;
    const mapping: InternalDiscriminatorMapping = {};

    // the mapping can be inferred from the oneOf refs next to the discriminator object
    for (const item of oneOf) {
      if ("$ref" in item) {
        // the name of the schema is the inferred discriminator enum value
        const value = item.$ref.split("/").pop();

        if (value) {
          if (!mapping[item.$ref]) {
            mapping[item.$ref] = { inferred: value };
          } else {
            mapping[item.$ref].inferred = value;
          }
        }
      }
    }

    // the mapping can be defined in the discriminator object itself
    if (discriminator.mapping) {
      for (const mappedValue in discriminator.mapping) {
        const mappedRef = discriminator.mapping[mappedValue];
        if (!mappedRef) {
          continue;
        }

        if (!mapping[mappedRef]?.defined) {
          // this overrides inferred values, but we don't need them anymore as soon as we have a defined value
          mapping[mappedRef] = { defined: [] };
        }

        mapping[mappedRef].defined?.push(mappedValue);
      }
    }

    for (const [mappedRef, { inferred, defined }] of Object.entries(mapping)) {
      if (refsHandled.includes(mappedRef)) {
        continue;
      }

      if (!inferred && !defined) {
        continue;
      }

      // prefer defined values over automatically inferred ones
      // the inferred enum values from the schema might not represent the actual enum values of the discriminator,
      // so if we have defined values, use them instead
      const mappedValues = defined ?? [inferred!];
      const resolvedSchema = resolveRef<SchemaObject>(schema, mappedRef, {
        silent: options.silent ?? false,
      });

      if (resolvedSchema?.allOf) {
        // if the schema is an allOf, we can append a new schema object to the allOf array
        resolvedSchema.allOf.push({
          type: "object",
          // discriminator enum properties always need to be required
          required: [discriminator.propertyName],
          properties: {
            [discriminator.propertyName]: createDiscriminatorEnum(mappedValues),
          },
        });

        refsHandled.push(mappedRef);
      } else if (
        typeof resolvedSchema === "object" &&
        "type" in resolvedSchema &&
        resolvedSchema.type === "object"
      ) {
        // if the schema is an object, we can apply the discriminator enums to its properties
        if (!resolvedSchema.properties) {
          resolvedSchema.properties = {};
        }

        // discriminator enum properties always need to be required
        if (!resolvedSchema.required) {
          resolvedSchema.required = [discriminator.propertyName];
        } else if (
          !resolvedSchema.required.includes(discriminator.propertyName)
        ) {
          resolvedSchema.required.push(discriminator.propertyName);
        }

        // add/replace the discriminator enum property
        resolvedSchema.properties[discriminator.propertyName] =
          createDiscriminatorEnum(
            mappedValues,
            resolvedSchema.properties[discriminator.propertyName],
          );

        refsHandled.push(mappedRef);
      } else {
        warn(
          `Discriminator mapping has an invalid schema (neither an object schema nor an allOf array): ${mappedRef} => ${mappedValues.join(
            ", ",
          )} (Discriminator: ${ref})`,
          options.silent,
        );
        continue;
      }
    }
  });

  // second, collect the schema objects that inherit from discriminators
  // (sometimes this mapping is implicit, so it can’t be done until we know
  // about every discriminator in the document)
  walk(schema, (obj, path) => {
    for (const key of ["oneOf", "anyOf", "allOf"] as const) {
      if (obj && Array.isArray(obj[key])) {
        for (const item of (obj as any)[key]) {
          if ("$ref" in item) {
            if (objects[item.$ref]) {
              objects[createRef(path)] = {
                ...objects[item.$ref],
              };
            }
          } else if (item.discriminator?.propertyName) {
            objects[createRef(path)] = { ...item.discriminator };
          }
        }
      }
    }
  });

  return { objects, refsHandled };
}

/** Walk through any JSON-serializable (i.e. non-circular) object */
export function walk(
  obj: unknown,
  cb: (value: Record<string, unknown>, path: (string | number)[]) => void,
  path: (string | number)[] = [],
): void {
  if (!obj || typeof obj !== "object") {
    return;
  }
  if (Array.isArray(obj)) {
    for (let i = 0; i < obj.length; i++) {
      walk(obj[i], cb, path.concat(i));
    }
    return;
  }
  cb(obj as Record<string, unknown>, path);
  for (const k of Object.keys(obj)) {
    walk((obj as Record<string, unknown>)[k], cb, path.concat(k));
  }
}

/** Print warning message */
export function warn(msg: string, silent = false) {
  if (!silent) {
    console.warn(c.yellow(` ⚠  ${msg}`)); // eslint-disable-line no-console
  }
}

export function renameDuplicates(arr: string[]): string[] {
  const count: Record<string, number> = {};
  const res: string[] = [];

  for (const item of arr) {
    if (count[item]) {
      let newName = item + count[item];
      while (res.includes(newName)) {
        count[item]++;
        newName = item + count[item];
      }
      res.push(newName);
    } else {
      count[item] = 1;
      res.push(item);
    }
  }

  return res;
}