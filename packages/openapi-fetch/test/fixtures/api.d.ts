/**
 * This file was auto-generated by openapi-typescript.
 * Do not make direct changes to the file.
 */

export interface paths {
  "/comment": {
    put: {
      requestBody: components["requestBodies"]["CreateReply"];
      responses: {
        201: components["responses"]["CreateReply"];
        500: components["responses"]["Error"];
      };
    };
  };
  "/blogposts": {
    get: {
      parameters: {
        query?: {
          tags?: string[];
          published?: boolean;
        };
      };
      responses: {
        200: components["responses"]["AllPostsGet"];
        500: components["responses"]["Error"];
      };
    };
    put: {
      requestBody: components["requestBodies"]["CreatePost"];
      responses: {
        201: components["responses"]["CreatePost"];
        500: components["responses"]["Error"];
      };
    };
    patch: {
      requestBody: components["requestBodies"]["PatchPost"];
      responses: {
        201: components["responses"]["PatchPost"];
      };
    };
  };
  "/blogposts/{post_id}": {
    get: {
      parameters: {
        query?: {
          version?: number;
          format?: string;
        };
        path: {
          post_id: string;
        };
      };
      responses: {
        200: components["responses"]["PostGet"];
        404: components["responses"]["Error"];
        500: components["responses"]["Error"];
      };
    };
    delete: {
      parameters: {
        path: {
          post_id: string;
        };
      };
      responses: {
        200: components["responses"]["PostDelete"];
        500: components["responses"]["Error"];
      };
    };
    patch: {
      parameters: {
        path: {
          post_id: string;
        };
      };
      requestBody: components["requestBodies"]["PatchPost"];
      responses: {
        200: components["responses"]["PatchPost"];
        404: components["responses"]["Error"];
        500: components["responses"]["Error"];
      };
    };
    parameters: {
      path: {
        post_id: string;
      };
    };
  };
  "/blogposts-optional": {
    put: {
      requestBody: components["requestBodies"]["CreatePostOptional"];
      responses: {
        201: components["responses"]["CreatePost"];
        500: components["responses"]["Error"];
      };
    };
  };
  "/blogposts-optional-inline": {
    put: {
      requestBody?: {
        content: {
          "application/json": components["schemas"]["Post"];
        };
      };
      responses: {
        201: components["responses"]["CreatePost"];
        500: components["responses"]["Error"];
      };
    };
  };
  "/header-params": {
    get: operations["getHeaderParams"];
  };
  "/media": {
    put: {
      requestBody: {
        content: {
          "application/json": {
            /** Format: blob */
            media: string;
            name: string;
          };
        };
      };
      responses: {
        "2XX": {
          content: {
            "application/json": {
              status: string;
            };
          };
        };
        "4XX": components["responses"]["Error"];
      };
    };
  };
  "/self": {
    get: {
      responses: {
        200: components["responses"]["User"];
        404: components["responses"]["Error"];
        500: components["responses"]["Error"];
      };
    };
  };
  "/string-array": {
    get: {
      responses: {
        200: components["responses"]["StringArray"];
        500: components["responses"]["Error"];
      };
    };
  };
  "/tag/{name}": {
    get: {
      parameters: {
        path: {
          name: string;
        };
      };
      responses: {
        200: components["responses"]["Tag"];
        500: components["responses"]["Error"];
      };
    };
    put: {
      parameters: {
        path: {
          name: string;
        };
      };
      requestBody: components["requestBodies"]["CreateTag"];
      responses: {
        201: components["responses"]["CreateTag"];
        500: components["responses"]["Error"];
      };
    };
    delete: {
      parameters: {
        path: {
          name: string;
        };
      };
      responses: {
        /** @description No Content */
        204: {
          content: never;
        };
        500: components["responses"]["Error"];
      };
    };
    parameters: {
      path: {
        name: string;
      };
    };
  };
  "/query-params": {
    get: {
      parameters: {
        query?: {
          string?: string;
          number?: number;
          boolean?: boolean;
          array?: string[];
          object?: {
            foo: string;
            bar: string;
          };
        };
      };
      responses: {
        200: {
          content: {
            "application/json": {
              status: string;
            };
          };
        };
        default: components["responses"]["Error"];
      };
    };
    parameters: {
      query?: {
        string?: string;
        number?: number;
        boolean?: boolean;
        array?: string[];
        object?: {
          foo: string;
          bar: string;
        };
      };
    };
  };
  "/path-params/{simple_primitive}/{simple_obj_flat}/{simple_arr_flat}/{simple_obj_explode*}/{simple_arr_explode*}/{.label_primitive}/{.label_obj_flat}/{.label_arr_flat}/{.label_obj_explode*}/{.label_arr_explode*}/{;matrix_primitive}/{;matrix_obj_flat}/{;matrix_arr_flat}/{;matrix_obj_explode*}/{;matrix_arr_explode*}": {
    get: {
      parameters: {
        path: {
          simple_primitive: string;
          simple_obj_flat: {
            a: string;
            c: string;
          };
          simple_arr_flat: number[];
          simple_obj_explode: {
            e: string;
            g: string;
          };
          simple_arr_explode: number[];
          label_primitive: string;
          label_obj_flat: {
            a: string;
            c: string;
          };
          label_arr_flat: number[];
          label_obj_explode: {
            e: string;
            g: string;
          };
          label_arr_explode: number[];
          matrix_primitive: string;
          matrix_obj_flat: {
            a: string;
            c: string;
          };
          matrix_arr_flat: number[];
          matrix_obj_explode: {
            e: string;
            g: string;
          };
          matrix_arr_explode: number[];
        };
      };
      responses: {
        200: {
          content: {
            "application/json": {
              status: string;
            };
          };
        };
        default: components["responses"]["Error"];
      };
    };
    parameters: {
      path: {
        simple_primitive: string;
        simple_obj_flat: {
          a: string;
          c: string;
        };
        simple_arr_flat: number[];
        simple_obj_explode: {
          e: string;
          g: string;
        };
        simple_arr_explode: number[];
        label_primitive: string;
        label_obj_flat: {
          a: string;
          c: string;
        };
        label_arr_flat: number[];
        label_obj_explode: {
          e: string;
          g: string;
        };
        label_arr_explode: number[];
        matrix_primitive: string;
        matrix_obj_flat: {
          a: string;
          c: string;
        };
        matrix_arr_flat: number[];
        matrix_obj_explode: {
          e: string;
          g: string;
        };
        matrix_arr_explode: number[];
      };
    };
  };
  "/default-as-error": {
    get: {
      responses: {
        default: components["responses"]["Error"];
      };
    };
  };
  "/anyMethod": {
    get: {
      responses: {
        200: components["responses"]["User"];
        404: components["responses"]["Error"];
        500: components["responses"]["Error"];
      };
    };
    put: {
      responses: {
        200: components["responses"]["User"];
        404: components["responses"]["Error"];
        500: components["responses"]["Error"];
      };
    };
    post: {
      responses: {
        200: components["responses"]["User"];
        404: components["responses"]["Error"];
        500: components["responses"]["Error"];
      };
    };
    delete: {
      responses: {
        200: components["responses"]["User"];
        404: components["responses"]["Error"];
        500: components["responses"]["Error"];
      };
    };
    options: {
      responses: {
        200: components["responses"]["User"];
        404: components["responses"]["Error"];
        500: components["responses"]["Error"];
      };
    };
    head: {
      responses: {
        200: components["responses"]["User"];
        404: components["responses"]["Error"];
        500: components["responses"]["Error"];
      };
    };
    patch: {
      responses: {
        200: components["responses"]["User"];
        404: components["responses"]["Error"];
        500: components["responses"]["Error"];
      };
    };
    trace: {
      responses: {
        200: components["responses"]["User"];
        404: components["responses"]["Error"];
        500: components["responses"]["Error"];
      };
    };
  };
  "/contact": {
    put: {
      requestBody: components["requestBodies"]["Contact"];
      responses: {
        200: components["responses"]["Contact"];
      };
    };
  };
  "/multiple-response-content": {
    get: {
      responses: {
        200: components["responses"]["MultipleResponse"];
      };
    };
  };
}

export type webhooks = Record<string, never>;

export interface components {
  schemas: {
    Post: {
      title: string;
      body: string;
      publish_date?: number;
    };
    StringArray: string[];
    User: {
      email: string;
      age?: number;
      avatar?: string;
      /** Format: date */
      created_at: number;
      /** Format: date */
      updated_at: number;
    };
  };
  responses: {
    AllPostsGet: {
      content: {
        "application/json": components["schemas"]["Post"][];
      };
    };
    CreatePost: {
      content: {
        "application/json": {
          status: string;
        };
      };
    };
    CreateTag: {
      content: {
        "application/json": {
          status: string;
        };
      };
    };
    CreateReply: {
      content: {
        "application/json;charset=utf-8": {
          message: string;
        };
      };
    };
    Contact: {
      content: {
        "text/html": string;
      };
    };
    Error: {
      content: {
        "application/json": {
          code: number;
          message: string;
        };
      };
    };
    PatchPost: {
      content: {
        "application/json": {
          status: string;
        };
      };
    };
    PostDelete: {
      content: {
        "application/json": {
          status: string;
        };
      };
    };
    PostGet: {
      content: {
        "application/json": components["schemas"]["Post"];
      };
    };
    StringArray: {
      content: {
        "application/json": components["schemas"]["StringArray"];
      };
    };
    Tag: {
      content: {
        "application/json": string;
      };
    };
    User: {
      content: {
        "application/json": components["schemas"]["User"];
      };
    };
    MultipleResponse: {
      content: {
        "application/json": {
          id: string;
          email: string;
          name?: string;
        };
        "application/ld+json": {
          "@id": string;
          email: string;
          name?: string;
        };
      };
    };
  };
  parameters: never;
  requestBodies: {
    CreatePost: {
      content: {
        "application/json": {
          title: string;
          body: string;
          publish_date: number;
        };
      };
    };
    CreatePostOptional?: {
      content: {
        "application/json": {
          title: string;
          body: string;
          publish_date: number;
        };
      };
    };
    CreateTag: {
      content: {
        "application/json": {
          description?: string;
        };
      };
    };
    CreateReply: {
      content: {
        "application/json;charset=utf-8": {
          message: string;
          replied_at: number;
        };
      };
    };
    Contact: {
      content: {
        "multipart/form-data": {
          name: string;
          email: string;
          subject: string;
          message: string;
        };
      };
    };
    PatchPost: {
      content: {
        "application/json": {
          title?: string;
          body?: string;
          publish_date?: number;
        };
      };
    };
  };
  headers: never;
  pathItems: never;
}

export type $defs = Record<string, never>;

export type external = Record<string, never>;

export interface operations {
  getHeaderParams: {
    parameters: {
      header: {
        "x-required-header": string;
      };
    };
    responses: {
      200: {
        content: {
          "application/json": {
            status: string;
          };
        };
      };
      500: components["responses"]["Error"];
    };
  };
}
