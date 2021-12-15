/**
 * This file was auto-generated by openapi-typescript.
 * Do not make direct changes to the file.
 */

export interface paths {
  "/test": {
    get: {
      responses: {
        /** A list of types. */
        200: unknown;
      };
    };
  };
}

export interface components {
  schemas: {
    /** @description Enum with null and nullable */
    MyType: {
      /** @enum {string|null} */
      myEnumTestFieldNullable?: ("foo" | "bar" | null) | null;
      /** @enum {string|null} */
      myEnumTestField?: ("foo" | "bar" | null) | null;
      /** @constant */
      myConstTestField?: "constant-value";
      /** @constant */
      myConstTestFieldNullable: 4 | null;
    };
  };
}

export interface operations {}

export interface external {}
