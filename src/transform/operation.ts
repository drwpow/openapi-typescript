import { OperationObject, ParameterObject, RequestBody } from "../types";
import { comment, isRef, transformRef } from "../utils";
import { transformParametersArray } from "./parameters";
import { transformResponsesObj } from "./responses";
import { transformSchemaObj } from "./schema";

export function transformOperationObj(
  operation: OperationObject,
  {
    globalParameters,
    immutableTypes,
    version,
  }: {
    globalParameters?: Record<string, ParameterObject>;
    immutableTypes: boolean;
    version: number;
  }
): string {
  const readonly = immutableTypes ? "readonly " : "";

  let output = "";

  if (operation.parameters) {
    output += `  ${readonly}parameters: {\n    ${transformParametersArray(operation.parameters, {
      globalParameters,
      immutableTypes,
      version,
    })}\n  }\n`;
  }

  if (operation.responses) {
    output += `  ${readonly}responses: {\n  ${transformResponsesObj(operation.responses, {
      immutableTypes,
    })}\n  }\n`;
  }

  if (operation.requestBody) {
    if (isRef(operation.requestBody)) {
      output += `  ${readonly}requestBody: ${transformRef(operation.requestBody.$ref)};\n`;
    } else {
      if (operation.requestBody.description) output += comment(operation.requestBody.description);

      output += `  ${readonly}requestBody: {\n`; // open requestBody
      output += `  ${transformRequestBodyObj(operation.requestBody, { immutableTypes })}`;
      output += `  }\n`; // close requestBody
    }
  }

  return output;
}

export function transformRequestBodyObj(
  requestBody: RequestBody,
  { immutableTypes }: { immutableTypes: boolean }
): string {
  const readonly = immutableTypes ? "readonly " : "";

  let output = "";

  const { content } = requestBody;

  if (content && Object.keys(content).length) {
    output += `  ${readonly}content: {\n`; // open content

    Object.entries(content).forEach(([k, v]) => {
      output += `      ${readonly}"${k}": ${transformSchemaObj(v.schema, { immutableTypes })};\n`;
    });
    output += `    }\n`; // close content
  } else {
    output += `  unknown;\n`;
  }

  return output;
}
