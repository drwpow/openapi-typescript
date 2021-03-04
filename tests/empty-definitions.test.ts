import swaggerToTS from "../src/index";

it("allow empty definitions", () => {
  expect(
    swaggerToTS(
      {
        swagger: "2.0",
        paths: {
          "/pet": {
            post: {
              description: "",
              operationId: "addPet",
              parameters: [
                {
                  in: "body",
                  name: "body",
                  description: "Pet object that needs to be added to the store",
                  required: true,
                  schema: {
                    $ref: "#/definitions/Pet",
                  },
                },
              ],
              responses: {
                405: {
                  description: "Invalid input",
                },
              },
            },
          },
        },
      },
      { version: 2 }
    )
  ).toBe(`/**
 * This file was auto-generated by openapi-typescript.
 * Do not make direct changes to the file.
 */

export interface paths {
  "/pet": {
    post: operations["addPet"];
  };
}

export interface operations {
  addPet: {
    parameters: {
      body: {
        /** Pet object that needs to be added to the store */
        body: definitions["Pet"];
      };
    };
    responses: {
      /** Invalid input */
      405: unknown;
    };
  };
}
`);
});
