import type { GlobalContext, ParameterObject, ReferenceObject } from "../types.js";
import { comment, getEntries, tsReadonly } from "../utils.js";
import { transformSchemaObj } from "./schema.js";

interface TransformParametersOptions extends GlobalContext {
  globalParameters?: Record<string, ParameterObject>;
}

const PARAM_END_RE = /"\]$/;

export function transformParametersArray(
  parameters: (ReferenceObject | ParameterObject)[],
  options: TransformParametersOptions
): string {
  const { globalParameters = {}, ...ctx } = options;
  const readonly = tsReadonly(ctx.immutableTypes);

  let output = "";

  // sort into map
  const mappedParams: Record<string, Record<string, ParameterObject>> = {};
  for (const paramObj of parameters) {
    if ("$ref" in paramObj && paramObj.$ref && globalParameters) {
      // take last segment
      let paramName = paramObj.$ref.split('["').pop();
      paramName = String(paramName).replace(PARAM_END_RE, "");

      if (globalParameters[paramName]) {
        const reference = globalParameters[paramName];
        if (!reference.in) continue;

        if (!mappedParams[reference.in]) mappedParams[reference.in] = {};
        switch (ctx.version) {
          case 3: {
            mappedParams[reference.in][reference.name || paramName] = {
              ...reference,
              schema: { $ref: paramObj.$ref },
            };
            break;
          }
          case 2: {
            mappedParams[reference.in][reference.name || paramName] = {
              ...reference,
              ...("$ref" in paramObj ? { $ref: paramObj.$ref } : null),
            };
            break;
          }
        }
      }
      continue;
    }

    if (!("in" in paramObj)) continue;
    if (!paramObj.in || !paramObj.name) continue;
    if (!mappedParams[paramObj.in]) mappedParams[paramObj.in] = {};
    mappedParams[paramObj.in][paramObj.name] = paramObj;
  }

  // transform output
  for (const [paramIn, paramGroup] of getEntries(mappedParams, ctx)) {
    output += `  ${readonly}${paramIn}: {\n`; // open in
    for (const [paramName, paramObj] of getEntries(paramGroup, ctx)) {
      let paramComment = "";
      if (paramObj.deprecated) paramComment += `@deprecated `;
      if (paramObj.description) paramComment += paramObj.description;
      if (paramComment) output += comment(paramComment);

      const required = paramObj.required ? `` : `?`;
      let paramType = ``;
      switch (ctx.version) {
        case 3: {
          paramType = paramObj.schema
            ? transformSchemaObj(paramObj.schema, { ...ctx, required: new Set<string>() })
            : "unknown";
          break;
        }
        case 2: {
          if (paramObj.in === "body" && paramObj.schema) {
            paramType = transformSchemaObj(paramObj.schema, { ...ctx, required: new Set<string>() });
          } else if (paramObj.type) {
            paramType = transformSchemaObj(paramObj, { ...ctx, required: new Set<string>() });
          } else {
            paramType = "unknown";
          }
          break;
        }
      }
      output += `    ${readonly}"${paramName}"${required}: ${paramType};\n`;
    }
    output += `  }\n`; // close in
  }

  return output;
}
