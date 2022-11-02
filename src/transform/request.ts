import type { GlobalContext, RequestBody } from "../types.js";
import { comment, getEntries, tsReadonly } from "../utils.js";
import { transformSchemaObj } from "./schema.js";

export function transformRequestBodies(requestBodies: Record<string, RequestBody>, ctx: GlobalContext) {
  let output = "";

  for (const [name, requestBody] of getEntries(requestBodies, ctx)) {
    if (requestBody && requestBody.description) output += `  ${comment(requestBody.description)}`;
    output += `  "${name}": {\n    ${transformRequestBodyObj(requestBody, ctx)}\n  }\n`;
  }

  return output;
}

export function transformRequestBodyObj(requestBody: RequestBody, ctx: GlobalContext): string {
  const readonly = tsReadonly(ctx.immutableTypes);

  let output = "";

  if (requestBody.content && Object.keys(requestBody.content).length) {
    output += `  ${readonly}content: {\n`; // open content
    for (const [k, v] of getEntries(requestBody.content, ctx)) {
      output += `      ${readonly}"${k}": ${transformSchemaObj(v.schema, { ...ctx, required: new Set<string>() })};\n`;
    }
    output += `    }\n`; // close content
  } else {
    output += `  unknown;\n`;
  }

  return output;
}
