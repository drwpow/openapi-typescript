import type { GlobalContext, OpenAPI3, OpenAPITSOptions, Subschema } from "./types.js";
import type { Readable } from "node:stream";
import { URL } from "node:url";
import load, { resolveSchema, VIRTUAL_JSON_URL } from "./load.js";
import { transformSchema } from "./transform/index.js";
import transformMediaTypeObject from "./transform/media-type-object.js";
import transformOperationObject from "./transform/operation-object.js";
import transformParameterObject from "./transform/parameter-object.js";
import transformParameterObjectArray from "./transform/parameter-object-array.js";
import transformRequestBodyObject from "./transform/request-body-object.js";
import transformResponseObject from "./transform/response-object.js";
import transformSchemaObject from "./transform/schema-object.js";
import { error, escObjKey, getDefaultFetch, getEntries, getSchemaObjectComment, indent } from "./utils.js";
export * from "./types.js"; // expose all types to consumers

const EMPTY_OBJECT_RE = /^\s*\{?\s*\}?\s*$/;

export const COMMENT_HEADER = `/**
 * This file was auto-generated by openapi-typescript.
 * Do not make direct changes to the file.
 */

`;

/**
 * This function is the entry to the program and allows the user to pass in a remote schema and/or local schema.
 * The URL or schema and headers can be passed in either programmatically and/or via the CLI.
 * Remote schemas are fetched from a server that supplies JSON or YAML format via an HTTP GET request. File based schemas
 * are loaded in via file path, most commonly prefixed with the file:// format. Alternatively, the user can pass in
 * OpenAPI2 or OpenAPI3 schema objects that can be parsed directly by the function without reading the file system.
 *
 * Function overloading is utilized for generating stronger types for our different schema types and option types.
 *
 * @param {string} schema Root Swagger Schema HTTP URL, File URL, and/or JSON or YAML schema
 * @param {SwaggerToTSOptions<typeof schema>} [options] Options to specify to the parsing system
 * @return {Promise<string>}  {Promise<string>} Parsed file schema
 */
async function openapiTS(
  schema: string | URL | OpenAPI3 | Readable,
  options: OpenAPITSOptions = {} as Partial<OpenAPITSOptions>
): Promise<string> {
  const ctx: GlobalContext = {
    additionalProperties: options.additionalProperties ?? false,
    alphabetize: options.alphabetize ?? false,
    defaultNonNullable: options.defaultNonNullable ?? false,
    discriminators: {},
    transform: typeof options.transform === "function" ? options.transform : undefined,
    postTransform: typeof options.postTransform === "function" ? options.postTransform : undefined,
    immutableTypes: options.immutableTypes ?? false,
    emptyObjectsUnknown: options.emptyObjectsUnknown ?? false,
    indentLv: 0,
    operations: {},
    pathParamsAsTypes: options.pathParamsAsTypes ?? false,
    parameters: {},
    silent: options.silent ?? false,
    supportArrayLength: options.supportArrayLength ?? false,
  };

  // note: we may be loading many large schemas into memory at once; take care to reuse references without cloning
  const isInlineSchema = typeof schema !== "string" && schema instanceof URL === false; // eslint-disable-line @typescript-eslint/no-unnecessary-boolean-literal-compare

  // 1. load schema (and subschemas)
  const allSchemas: { [id: string]: Subschema } = {};
  const schemaURL: URL = typeof schema === "string" ? resolveSchema(schema) : (schema as URL);
  await load(schemaURL, {
    ...ctx,
    auth: options.auth,
    schemas: allSchemas,
    rootURL: isInlineSchema ? new URL(VIRTUAL_JSON_URL) : schemaURL, // if an inline schema is passed, use virtual URL
    urlCache: new Set(),
    httpHeaders: options.httpHeaders,
    httpMethod: options.httpMethod,
    fetch: options.fetch ?? getDefaultFetch(),
  });

  // 1. basic validation
  for (const k of Object.keys(allSchemas)) {
    const subschema = allSchemas[k];
    if (typeof (subschema.schema as any).swagger === "string") {
      error("Swagger 2.0 and older no longer supported. Please use v5.");
      process.exit(1);
    }
    if (subschema.hint === "OpenAPI3" && typeof subschema.schema.openapi === "string") {
      if (parseInt(subschema.schema.openapi) !== 3) {
        error(`Unsupported OpenAPI version "${subschema.schema.openapi}". Only 3.x is supported.`);
        process.exit(1);
      }
    }
  }

  // 2. generate raw output
  const output: string[] = [];

  // 2a. Start file, inject custom code (if any)
  if ("commentHeader" in options) {
    if (options.commentHeader) output.push(options.commentHeader);
  } else {
    output.push(COMMENT_HEADER);
  }

  // 2b. options.inject
  if (options.inject) output.push(options.inject);

  // 2c. root schema
  const rootTypes = transformSchema(allSchemas["."].schema as OpenAPI3, ctx);
  for (const k of Object.keys(rootTypes)) {
    if (rootTypes[k] && !EMPTY_OBJECT_RE.test(rootTypes[k])) {
      output.push(
        options.exportType ? `export type ${k} = ${rootTypes[k]};` : `export interface ${k} ${rootTypes[k]}`,
        ""
      );
    } else {
      output.push(`export type ${k} = Record<string, never>;`, "");
    }
    delete rootTypes[k];
    delete allSchemas["."]; // garbage collect, but also remove from next step (external)
  }

  // 2d. external schemas (subschemas)
  const externalKeys = Object.keys(allSchemas); // root schema (".") should already be removed
  if (externalKeys.length) {
    let indentLv = 0;
    output.push(options.exportType ? "export type external = {" : "export interface external {");
    externalKeys.sort((a, b) => a.localeCompare(b, "en", { numeric: true })); // sort external keys because they may have resolved in a different order each time
    indentLv++;
    for (const subschemaID of externalKeys) {
      const subschema = allSchemas[subschemaID];
      const key = escObjKey(subschemaID);
      const path = `${subschemaID}#`;
      let subschemaOutput = "";
      let comment: string | undefined;
      switch (subschema.hint) {
        case "OpenAPI3": {
          const subschemaTypes = transformSchema(subschema.schema, { ...ctx, indentLv });
          if (!Object.keys(subschemaTypes).length) break;
          output.push(indent(`${key}: {`, 1), "");
          indentLv++;
          for (const [k, v] of getEntries(subschemaTypes, options.alphabetize)) {
            if (EMPTY_OBJECT_RE.test(v)) output.push(indent(`${escObjKey(k)}: Record<string, never>;`, indentLv));
            else output.push(indent(`${escObjKey(k)}: {${v};`, indentLv), indent("};", indentLv));
          }
          indentLv--;
          output.push(indent("}", 1));
          break;
        }
        case "MediaTypeObject": {
          subschemaOutput = transformMediaTypeObject(subschema.schema, { path, ctx: { ...ctx, indentLv } });
          break;
        }
        case "OperationObject": {
          comment = getSchemaObjectComment(subschema.schema, indentLv);
          subschemaOutput = transformOperationObject(subschema.schema, { path, ctx: { ...ctx, indentLv } });
          break;
        }
        case "ParameterObject": {
          subschemaOutput = transformParameterObject(subschema.schema, { path, ctx: { ...ctx, indentLv } });
          break;
        }
        case "ParameterObject[]": {
          // hack: sometimes subschemas contain only a single SchemaObject or ParameterObject and get incorrectly hinted
          // currently unknown what the real fix is, but this is a bandaid
          if (typeof subschema.schema === "object" && ("schema" in subschema.schema || "type" in subschema.schema)) {
            subschemaOutput = transformSchemaObject(subschema.schema as any, { path, ctx: { ...ctx, indentLv } });
          } else {
            subschemaOutput += "{\n";
            indentLv++;
            subschemaOutput += transformParameterObjectArray(subschema.schema, { path, ctx: { ...ctx, indentLv } });
            subschemaOutput += "\n";
            indentLv--;
            subschemaOutput += indent("};", indentLv);
          }
          break;
        }
        case "RequestBodyObject": {
          subschemaOutput = transformRequestBodyObject(subschema.schema, { path, ctx: { ...ctx, indentLv } });
          break;
        }
        case "ResponseObject": {
          subschemaOutput = transformResponseObject(subschema.schema, { path, ctx: { ...ctx, indentLv } });
          break;
        }
        case "SchemaObject": {
          subschemaOutput = transformSchemaObject(subschema.schema, { path, ctx: { ...ctx, indentLv } });
          break;
        }
        default: {
          error(`Could not resolve subschema ${subschemaID}. Unknown type "${(subschema as any).hint}".`);
          process.exit(1);
        }
      }
      if (subschemaOutput && !EMPTY_OBJECT_RE.test(subschemaOutput)) {
        if (comment) output.push(indent(comment, indentLv));
        output.push(indent(`${key}: ${subschemaOutput}`, indentLv));
      }
      delete allSchemas[subschemaID];
    }
    indentLv--;
    output.push(indent(`}${options.exportType ? ";" : ""}`, indentLv), "");
  } else {
    output.push(`export type external = Record<string, never>;`, "");
  }

  // 3. operations (only get fully built after all external schemas transformed)
  if (Object.keys(ctx.operations).length) {
    output.push(options.exportType ? "export type operations = {" : "export interface operations {", "");
    for (const [key, { operationType, comment }] of Object.entries(ctx.operations)) {
      if (comment) output.push(indent(comment, 1));
      output.push(indent(`${escObjKey(key)}: ${operationType};`, 1));
    }
    output.push(`}${options.exportType ? ";" : ""}`, "");
  } else {
    output.push(`export type operations = Record<string, never>;`, "");
  }

  // 4a. OneOf type helper (@see https://github.com/Microsoft/TypeScript/issues/14094#issuecomment-723571692)
  if (output.join("\n").includes("OneOf")) {
    output.splice(
      1,
      0,
      "/** OneOf type helpers */",
      "type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };",
      "type XOR<T, U> = (T | U) extends object ? (Without<T, U> & U) | (Without<U, T> & T) : T | U;",
      "type OneOf<T extends any[]> = T extends [infer Only] ? Only : T extends [infer A, infer B, ...infer Rest] ? OneOf<[XOR<A, B>, ...Rest]> : never;",
      ""
    );
  }

  // 4b. WithRequired type helper (@see https://github.com/drwpow/openapi-typescript/issues/657#issuecomment-1399274607)
  if (output.join("\n").includes("WithRequired")) {
    output.splice(
      1,
      0,
      "/** WithRequired type helpers */",
      "type WithRequired<T, K extends keyof T> = T & { [P in K]-?: T[P] };",
      ""
    );
  }

  return output.join("\n");
}

export default openapiTS;
