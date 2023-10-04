/* eslint-disable @typescript-eslint/no-var-requires */

// important: MUST use require()!
const { fileURLToPath } = require("node:url");
const ts = require("typescript");
const openapiTS = require("../dist/index.cjs");

// copy from lib/ts.ts for CJS
function astToString(ast, options) {
  const sourceFile = ts.createSourceFile(
    options?.fileName ?? "openapi-ts.ts",
    options?.sourceText ?? "",
    ts.ScriptTarget.ESNext,
    false,
    ts.ScriptKind.TS,
  );
  sourceFile.statements = ts.factory.createNodeArray(
    Array.isArray(ast) ? ast : [ast],
  );
  const printer = ts.createPrinter({
    newLine: ts.NewLineKind.LineFeed,
    removeComments: false,
    ...options?.formatOptions,
  });
  return printer.printFile(sourceFile);
}

describe("CJS bundle", () => {
  it("basic", async () => {
    const output = `/**
 * This file was auto-generated by openapi-typescript.
 * Do not make direct changes to the file.
 */

${astToString(
  await openapiTS(new URL("../examples/stripe-api.yaml", import.meta.url)),
)}`;
    expect(output).toMatchFileSnapshot(
      fileURLToPath(new URL("../examples/stripe-api.ts", import.meta.url)),
    );
  });
});
