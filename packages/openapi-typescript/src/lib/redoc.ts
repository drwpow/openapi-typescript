import {
  BaseResolver,
  bundle,
  createConfig,
  makeDocumentFromString,
  type RawConfig as RedoclyConfig,
  Source,
  type Document,
  lintDocument,
} from "@redocly/openapi-core";
import { Readable } from "node:stream";
import { fileURLToPath } from "node:url";
import { OpenAPI3 } from "../types.js";
import { debug, error } from "./utils.js";

export interface ValidateAndBundleOptions {
  redocly?: RedoclyConfig;
  cwd: string;
}

export async function parseSchema(
  schema: unknown,
  cwd: string,
  resolver: BaseResolver,
): Promise<Document> {
  if (!schema) {
    throw new Error(`Can’t parse empty schema`);
  }
  if (typeof schema === "string") {
    return makeDocumentFromString(schema, cwd);
  }
  if (schema instanceof URL) {
    return resolver.parseDocument(
      await resolver.loadExternalRef(
        schema.protocol === "file:" ? fileURLToPath(schema) : schema.href,
      ),
      true,
    );
  }
  if (schema instanceof Buffer) {
    return makeDocumentFromString(schema.toString("utf8"), cwd);
  }
  if (typeof schema === "object" && !Array.isArray(schema)) {
    return {
      source: new Source(cwd, JSON.stringify(schema), "application/json"),
      parsed: schema,
    };
  }
  throw new Error(
    `Expected string, object, or Buffer. Got ${
      Array.isArray(schema) ? "Array" : typeof schema
    }`,
  );
}

export async function validateAndBundle(
  source: string | URL | OpenAPI3 | Readable,
  options?: ValidateAndBundleOptions,
) {
  const redocConfigT = performance.now();
  const redocConfig = await createConfig(options?.redocly ?? {});
  debug("Loaded Redoc config", "redoc", performance.now() - redocConfigT);
  const redocParseT = performance.now();
  const resolver = new BaseResolver(redocConfig.resolve);
  const document = await parseSchema(
    source,
    options?.cwd ?? process.cwd(),
    resolver,
  );
  debug("Parsed schema", "redoc", performance.now() - redocParseT);

  // 1. check for OpenAPI 3 or greater
  const openapiVersion = parseFloat(document.parsed.openapi);

  if (
    document.parsed.swagger ||
    !document.parsed.openapi ||
    Number.isNaN(openapiVersion) ||
    openapiVersion < 3 ||
    openapiVersion >= 4
  ) {
    if (document.parsed.swagger) {
      error("Unsupported Swagger version: 2.x. Use OpenAPI 3.x instead.");
    } else if (
      document.parsed.openapi ||
      openapiVersion < 3 ||
      openapiVersion >= 4
    ) {
      error(`Unsupported OpenAPI version: ${document.parsed.openapi}`);
    } else {
      error("Unsupported schema format, expected `openapi: 3.x`");
    }
    process.exit(1);
    return; // hack for tests/mocking
  }

  // 2. lint
  const redocLintT = performance.now();
  const problems = await lintDocument({
    document,
    config: redocConfig.styleguide,
    externalRefResolver: resolver,
  });
  if (problems.length) {
    let hasError = false;
    for (const problem of problems) {
      if (problem.severity === "error") {
        error(problem.message);
        hasError = true;
      }
    }
    if (hasError) {
      process.exit(1);
      return;
    }
  }
  debug("Linted schema", "lint", performance.now() - redocLintT);

  // 3. bundle
  const redocBundleT = performance.now();
  const bundled = await bundle({
    config: redocConfig,
    dereference: true,
    doc: document,
  });
  if (bundled.problems.length) {
    let hasError = false;
    for (const problem of bundled.problems) {
      error(problem.message);
      if (problem.severity === "error") {
        hasError = true;
      }
    }
    if (hasError) {
      process.exit(1);
      return;
    }
  }
  debug("Bundled schema", "bundle", performance.now() - redocBundleT);

  return bundled.bundle.parsed;
}
