/**
 * This file was auto-generated by openapi-typescript.
 * Do not make direct changes to the file.
 */

export interface paths {
  "/test": {
    post: operations["addTest"];
  };
}

export interface definitions {
  /** Enum with null */
  MyType: {
    myField?: ("foo" | "bar" | null) | null;
  };
}

export interface operations {
  addTest: {
    responses: {
      /** OK */
      200: unknown;
    };
  };
}
