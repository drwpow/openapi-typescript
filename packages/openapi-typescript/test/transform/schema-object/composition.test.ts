import { fileURLToPath } from "node:url";
import { astToString } from "../../../src/lib/ts.js";
import transformSchemaObject from "../../../src/transform/schema-object.js";
import { DEFAULT_CTX, TestCase } from "../../test-helpers.js";

const DEFAULT_OPTIONS = {
  path: "#/components/schemas/schema-object",
  ctx: { ...DEFAULT_CTX },
};

describe("composition", () => {
  const tests: TestCase[] = [
    [
      "polymorphic > nullable",
      {
        given: {
          type: ["string", "boolean", "number", "null"],
        },
        want: `string | boolean | number | null`,
        // options: DEFAULT_OPTIONS,
      },
    ],
    [
      "polymorphic > enum + nullable",
      {
        given: {
          type: ["string", "null"],
          enum: [null, "blue", "green", "yellow"],
        },
        want: `null | "blue" | "green" | "yellow"`,
        // options: DEFAULT_OPTIONS,
      },
    ],
    [
      "polymorphic > enum + nullable (null missing in enum)",
      {
        given: {
          type: ["string", "null"],
          enum: ["blue", "green", "yellow"],
        },
        want: `"blue" | "green" | "yellow"`,
        // options: DEFAULT_OPTIONS,
      },
    ],
    [
      "polymorphic > enum + nullable (null missing in enum, falsy value in enum",
      {
        given: {
          type: ["string", "null"],
          enum: ["", "blue", "green", "yellow"],
        },
        want: `"" | "blue" | "green" | "yellow"`,
        // options: DEFAULT_OPTIONS,
      },
    ],
    [
      "oneOf > primitives",
      {
        given: { oneOf: [{ type: "string" }, { type: "number" }] },
        want: `string | number`,
        // options: DEFAULT_OPTIONS,
      },
    ],
    [
      "oneOf > string const",
      {
        given: {
          oneOf: [
            { type: "string", const: "hello" },
            { type: "string", const: "world" },
          ],
        },
        want: `"hello" | "world"`,
        // options: DEFAULT_OPTIONS,
      },
    ],
    [
      "oneOf > number const",
      {
        given: {
          oneOf: [
            { type: "number", const: 0 },
            { type: "number", const: 1 },
          ],
        },
        want: `0 | 1`,
        // options: DEFAULT_OPTIONS,
      },
    ],
    [
      "oneOf > nullable",
      {
        given: {
          oneOf: [{ type: "integer" }, { type: "string" }, { type: "null" }],
        },
        want: `number | string | null`,
        // options: DEFAULT_OPTIONS,
      },
    ],
    [
      "oneOf > nullable (deprecated syntax)",
      {
        given: {
          oneOf: [{ type: "integer" }, { type: "string" }],
          nullable: true,
        },
        want: `(number | string) | null`,
        // options: DEFAULT_OPTIONS,
      },
    ],
    [
      "oneOf > object without properties",
      {
        given: {
          type: "object",
          oneOf: [
            { type: "object", properties: { string: { type: "string" } } },
            { type: "object", properties: { boolean: { type: "boolean" } } },
          ],
        },
        want: `{
    string?: string;
} | {
    boolean?: boolean;
}`,
        // options: DEFAULT_OPTIONS,
      },
    ],
    [
      "oneOf > object with properties",
      {
        given: {
          type: "object",
          oneOf: [
            { type: "object", properties: { foo: { type: "string" } } },
            { type: "object", properties: { bar: { type: "string" } } },
          ],
          properties: {
            baz: { type: "string" },
          },
        },
        want: `{
    baz?: string;
} & ({
    foo?: string;
} | {
    bar?: string;
})`,
      },
      // options: DEFAULT_OPTIONS,
    ],
    [
      "oneOf > polymorphic",
      {
        given: {
          oneOf: [{ type: "integer" }, { type: "string" }],
          type: ["null", "integer", "string"],
        },
        want: `null | number | string`,
        // options: DEFAULT_OPTIONS,
      },
    ],
    [
      "enum > acting as oneOf",
      {
        given: {
          type: "object",
          additionalProperties: true,
          enum: [
            { $ref: "#/components/schemas/simple-user" },
            { $ref: "#/components/schemas/team" },
            { $ref: "#/components/schemas/organization" },
          ],
        },
        want: `{
    [key: string]: unknown;
} & (components["schemas"]["simple-user"] | components["schemas"]["team"] | components["schemas"]["organization"])`,
        options: {
          ...DEFAULT_OPTIONS,
          ctx: {
            ...DEFAULT_OPTIONS.ctx,
            resolve(ref) {
              switch (ref) {
                case "#/components/schemas/simple-user":
                case "#/components/schemas/team":
                case "#/components/schemas/organization": {
                  return {
                    type: "object",
                    required: ["name"],
                    properties: { name: { type: "string" } },
                  };
                }
                default: {
                  return undefined as any;
                }
              }
            },
          },
        },
      },
    ],
    [
      "discriminator > allOf",
      {
        given: {
          type: "object",
          allOf: [
            { $ref: "#/components/schemas/parent" },
            { type: "object", properties: { string: { type: "string" } } },
          ],
        },
        want: `{
    operation: "test";
} & (Omit<components["schemas"]["parent"], "operation"> & {
    string?: string;
})`,
        options: {
          ...DEFAULT_OPTIONS,
          ctx: {
            ...DEFAULT_OPTIONS.ctx,
            discriminators: {
              [DEFAULT_OPTIONS.path]: {
                propertyName: "operation",
                mapping: {
                  test: DEFAULT_OPTIONS.path,
                },
              },
              "#/components/schemas/parent": {
                propertyName: "operation",
                mapping: {
                  test: DEFAULT_OPTIONS.path,
                },
              },
            },
            resolve(ref) {
              switch (ref) {
                case "#/components/schemas/parent": {
                  return {
                    propertyName: "operation",
                    mapping: {
                      test: DEFAULT_OPTIONS.path,
                    },
                  };
                }
                default: {
                  return undefined as any;
                }
              }
            },
          },
        },
      },
    ],
    [
      "discriminator > oneOf",
      {
        given: {
          type: "object",
          required: ["name"],
          properties: {
            name: { type: "string" },
          },
        },
        want: `{
    petType: "Cat";
    name: string;
}`,
        options: {
          path: "#/components/schemas/Cat",
          ctx: {
            ...DEFAULT_OPTIONS.ctx,
            discriminators: {
              "#/components/schemas/Pet": {
                propertyName: "petType",
                oneOf: ["#/components/schemas/Cat"],
              },
              "#/components/schemas/Cat": {
                propertyName: "petType",
                oneOf: ["#/components/schemas/Cat"],
              },
            },
            resolve(ref) {
              switch (ref) {
                case "#/components/schemas/Pet": {
                  return {
                    propertyName: "petType",
                    oneOf: ["#/components/schemas/Cat"],
                  };
                }
                default: {
                  return undefined as any;
                }
              }
            },
          },
        },
      },
    ],

    [
      "discriminator > oneOf + null + implicit mapping",
      {
        given: {
          oneOf: [{ $ref: "#/components/schemas/parent" }, { type: "null" }],
        },
        want: `{
    operation: "schema-object";
} & (Omit<components["schemas"]["parent"], "operation"> | null)`,
        options: {
          ...DEFAULT_OPTIONS,
          ctx: {
            ...DEFAULT_OPTIONS.ctx,
            discriminators: {
              [DEFAULT_OPTIONS.path]: {
                propertyName: "operation",
              },
              "#/components/schemas/parent": {
                propertyName: "operation",
              },
            },
            resolve(ref) {
              switch (ref) {
                case "#/components/schemas/parent": {
                  return { propertyName: "operation" };
                }
                default: {
                  return undefined as any;
                }
              }
            },
          },
        },
      },
    ],
    [
      "discriminator > escape",
      {
        given: {
          type: "object",
          allOf: [
            { $ref: "#/components/schemas/parent" },
            { type: "object", properties: { string: { type: "string" } } },
          ],
        },
        want: `{
    "@type": "test";
} & (Omit<components["schemas"]["parent"], "@type"> & {
    string?: string;
})`,
        options: {
          ...DEFAULT_OPTIONS,
          ctx: {
            ...DEFAULT_OPTIONS.ctx,
            discriminators: {
              "#/components/schemas/schema-object": {
                propertyName: "@type",
                mapping: {
                  test: DEFAULT_OPTIONS.path,
                },
              },
              "#/components/schemas/parent": {
                propertyName: "@type",
                mapping: {
                  test: DEFAULT_OPTIONS.path,
                },
              },
            },
            resolve(ref) {
              switch (ref) {
                case "#/components/schemas/parent": {
                  return {
                    propertyName: "@type",
                    mapping: {
                      test: DEFAULT_OPTIONS.path,
                    },
                  };
                }
                default: {
                  return undefined as any;
                }
              }
            },
          },
        },
      },
    ],
    [
      "discriminator > automatic propertyName",
      {
        given: {
          type: "object",
          allOf: [{ $ref: "#/components/schemas/Pet" }],
          properties: {
            bark: { type: "boolean" },
          },
          additionalProperties: false,
        },
        want: `{
    _petType: "Dog";
    bark?: boolean;
} & Omit<components["schemas"]["Pet"], "_petType">`,
        options: {
          path: "#/components/schemas/Dog",
          ctx: {
            ...DEFAULT_OPTIONS.ctx,
            discriminators: {
              "#/components/schemas/Pet": {
                propertyName: "_petType",
              },
              [DEFAULT_OPTIONS.path]: {
                propertyName: "_petType",
              },
            },
            resolve(ref) {
              switch (ref) {
                case "#/components/schemas/Pet": {
                  return { propertyName: "_petType" };
                }
                default: {
                  return undefined as any;
                }
              }
            },
          },
        },
      },
    ],
    [
      "allOf > basic",
      {
        given: {
          allOf: [
            {
              type: "object",
              properties: { red: { type: "number" }, blue: { type: "number" } },
              required: ["red", "blue"],
            },
            {
              type: "object",
              properties: { green: { type: "number" } },
              required: ["green"],
            },
          ],
        },
        want: `{
    red: number;
    blue: number;
} & {
    green: number;
}`,
        // options: DEFAULT_OPTIONS,
      },
    ],
    [
      "allOf > sibling required",
      {
        given: {
          required: ["red", "blue", "green"],
          allOf: [
            {
              type: "object",
              properties: { red: { type: "number" }, blue: { type: "number" } },
            },
            { type: "object", properties: { green: { type: "number" } } },
          ],
        },
        want: `WithRequired<{
    red?: number;
    blue?: number;
} & {
    green?: number;
}, "red" | "blue" | "green">`,
        // options: DEFAULT_OPTIONS,
      },
    ],
    [
      "anyOf > basic",
      {
        given: {
          anyOf: [
            {
              type: "object",
              properties: { red: { type: "number" } },
              required: ["red"],
            },
            {
              type: "object",
              properties: { blue: { type: "number" } },
              required: ["blue"],
            },
            {
              type: "object",
              properties: { green: { type: "number" } },
              required: ["green"],
            },
          ],
        },
        want: `{
    red: number;
} | {
    blue: number;
} | {
    green: number;
}`,
        // options: DEFAULT_OPTIONS
      },
    ],
  ];

  describe.each(tests)(
    "%s",
    (_, { given, want, options = DEFAULT_OPTIONS, ci }) => {
      test.skipIf(ci?.skipIf)(
        "test",
        async () => {
          const result = astToString(transformSchemaObject(given, options));
          if (want instanceof URL) {
            expect(result).toMatchFileSnapshot(fileURLToPath(want));
          } else {
            expect(result).toBe(want + "\n");
          }
        },
        ci?.timeout,
      );
    },
  );
});
