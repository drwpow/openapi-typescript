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
    /** Enum with null */
    MyType: {
      myField?: ("foo" | "bar" | null) | null;
    };
  };
}

export interface operations {}
