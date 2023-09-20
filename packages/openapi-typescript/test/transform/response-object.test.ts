import { astToString } from "../../src/lib/ts.js";
import transformResponseObject from "../../src/transform/response-object.js";
import { DEFAULT_CTX, TestCase } from "../test-helpers.js";

const DEFAULT_OPTIONS = {
  path: "#/paths/~1get-item/responses/200",
  ctx: { ...DEFAULT_CTX },
};

describe("transformResponseObject", () => {
  const tests: TestCase[] = [
    [
      "basic",
      {
        given: {
          description: "basic",
          headers: {
            foo: {
              schema: { type: "string" },
            },
          },
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  url: { type: "string" },
                  "content-type": { type: "string" },
                },
                required: ["url"],
              },
            },
          },
        },
        want: `{
    headers: {
        foo?: string;
        [name: string]: unknown;
    };
    content: {
        "application/json": {
            url: string;
            "content-type"?: string;
        };
    };
}`,
        // options: DEFAULT_OPTIONS,
      },
    ],
    [
      "empty",
      {
        given: {
          description: "empty",
          headers: {
            "some-header": {
              schema: { type: "string" },
              required: true,
            },
          },
        },
        want: `{
    headers: {
        "some-header": string;
        [name: string]: unknown;
    };
    content?: never;
}`,
        // options: DEFAULT_OPTIONS,
      },
    ],
  ];

  test.each(tests)("%s", (_, { given, want, options = DEFAULT_OPTIONS }) => {
    const ast = transformResponseObject(given, options);
    expect(astToString(ast).trim()).toBe(want.trim());
  });
});
