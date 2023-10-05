---
title: CLI
description: openapi-typescript CLI usage
---

The CLI is the most common way to use openapi-typescript. The CLI can parse JSON and YAML, and even validates your schemas using the [Redocly CLI](https://redocly.com/docs/cli/commands/lint/). It can parse local and remote schemas (and even supports basic auth).

## Transforming an OpenAPI schema to TypeScript

### Single schema

The simplest way to transform schemas is by specifying an input schema (JSON or YAML), followed by `--output` (`-o`) where you’d like the output to be saved:

```bash
npx openapi-typescript schema.yaml -o schema.ts

# 🚀 schema.yaml -> schema.ts [50ms]
```

```bash
npx openapi-typescript https://petstore3.swagger.io/api/v3/openapi.yaml -o petstore.d.ts

# 🚀 https://petstore3.swagger.io/api/v3/openapi.yaml -> petstore.d.ts [250ms]
```

### Multiple schemas

To transform multiple schemas, create a `redocly.yaml` file in the root of your project with [APIs defined](https://redocly.com/docs/cli/configuration/). Under `apis`, give each schema a unique name and optionally a version (the name doesn’t matter, so long as it’s unique). Set the `root` value to your schema’s entry point—this will act as the main input. For the output, set it with `openapi-ts.output`:

```yaml
apis:
  core@v2:
    root: ./openapi/openapi.yaml
    openapi-ts:
      output: ./openapi/openapi.ts
  external@v1:
    root: ./openapi/external.yaml
    openapi-ts:
      output: ./openapi/openapi.ts
```

Whenver you have a `redocly.yaml` file in your project with `apis`, you can omit the input/output parameters in the CLI:

```bash
npx openapi-typescript
```

> ⚠️ In previous versions globbing was supported, but that has been **deprecated** in v7 in favor of `redocly.yaml`. You’ll be able to control per-schema output locations better, as well as getting unique per-schema settings.

## Redoc config

A `redocly.yaml` file isn’t required to use openapi-typescript. By default it extends the `"minimal"` built-in config. But it is recommended if you want to have custom validation rules (or build types for [multiple schemas](#multiple-schemas)). The CLI will try to automatically find a `redocly.yaml` in the root of your project, but you can also provide its location with the `--redoc` flag:

```bash
npx openapi-typescript --redoc ./path/to/redocly.yaml
```

You can read more about the Redoc’s configuration options [in their docs](https://redocly.com/docs/cli/configuration/).

## Auth

Authentication for non-public schemas is handled in your [Redocly config](https://redocly.com/docs/cli/configuration/#resolve-non-public-or-non-remote-urls). You can add headers and basic authentication like so:

```yaml
resolve:
  http:
    headers:
      - matches: https://api.example.com/v2/**
        name: X-API-KEY
        envVariable: SECRET_KEY
      - matches: https://example.com/*/test.yaml
        name: Authorization
        envVariable: SECRET_AUTH
```

Refer to the [Redocly docs](https://redocly.com/docs/cli/configuration/#resolve-non-public-or-non-remote-urls) for additional options.

## Options

| Option                    | Alias | Default  | Description                                                                                                         |
| :------------------------ | :---- | :------: | :------------------------------------------------------------------------------------------------------------------ |
| `--help`                  |       |          | Display inline help message and exit                                                                                |
| `--version`               |       |          | Display this library’s version and exit                                                                             |
| `--output [location]`     | `-o`  | (stdout) | Where should the output file be saved?                                                                              |
| `--redoc [location]`      |       |          | Path to a `redocly.yaml` file (see [Multiple schemas](#multiple-schemas))                                           |
| `--immutable`             |       | `false`  | Generates immutable types (readonly properties and readonly array)                                                  |
| `--additional-properties` |       | `false`  | Allow arbitrary properties for all schema objects without `additionalProperties: false`                             |
| `--empty-objects-unknown` |       | `false`  | Allow arbitrary properties for schema objects with no specified properties, and no specified `additionalProperties` |
| `--default-non-nullable`  |       | `false`  | Treat schema objects with default values as non-nullable                                                            |
| `--export-type`           | `-t`  | `false`  | Export `type` instead of `interface`                                                                                |
| `--path-params-as-types`  |       | `false`  | Allow dynamic string lookups on the `paths` object                                                                  |
| `--array-length`          |       | `false`  | Generate tuples using array `minItems` / `maxItems`                                                                 |
| `--alphabetize`           |       | `false`  | Sort types alphabetically                                                                                           |
| `--exclude-deprecated`    |       | `false`  | Exclude deprecated fields from types                                                                                |

### pathParamsAsTypes flag

By default, your URLs are preserved exactly as-written in your schema:

```ts
export interface paths {
  "/user/{user_id}": components["schemas"]["User"];
}
```

Which means your type lookups also have to match the exact URL:

```ts
import { paths } from "./my-schema";

const url = `/user/${id}`;
type UserResponses = paths["/user/{user_id}"]["responses"];
```

But when `--path-params-as-types` is enabled, you can take advantage of dynamic lookups like so:

```ts
import { paths } from "./my-schema";

const url = `/user/${id}`;
type UserResponses = paths[url]["responses"]; // automatically matches `paths['/user/{user_id}']`
```

Though this is a contrived example, you could use this feature to automatically infer typing based on the URL in a fetch client or in some other useful place in your application.

_Thanks, [@Powell-v2](https://github.com/Powell-v2)!_

### arrayLength flag

This option is useful for generating tuples if an array type specifies `minItems` or `maxItems`.

For example, given the following schema:

```yaml
components:
  schemas:
    TupleType
      type: array
      items:
        type: string
      minItems: 1
      maxItems: 2
```

Enabling `--array-length` would change the typing like so:

```diff
  export interface components {
    schemas: {
-     TupleType: string[];
+     TupleType: [string] | [string, string];
    };
  }
```

This results in more explicit typechecking of array lengths.

_Note: this has a reasonable limit, so for example `maxItems: 100` would simply flatten back down to `string[];`_

_Thanks, [@kgtkr](https://github.com/kgtkr)!_
