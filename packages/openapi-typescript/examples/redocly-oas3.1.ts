/**
 * This file was auto-generated by openapi-typescript.
 * Do not make direct changes to the file.
 */

export interface paths {
    "/pets/items": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Get Test! Foo! Etc! */
        get: operations["getTest"];
        put: never;
        post: never;
        delete: never;
        options: never;
        head: never;
        patch: never;
        trace: never;
    };
    "/pets": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** List all pets */
        get: operations["listPets"];
        put: never;
        post: never;
        delete: never;
        options: never;
        head: never;
        patch: never;
        trace: never;
    };
    "/pets/model": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** List all pets */
        get: operations["listPetsModel"];
        put: never;
        post: never;
        delete: never;
        options: never;
        head: never;
        patch: never;
        trace: never;
    };
    "/pets/person": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** List all pets */
        get: operations["listPetsPerson"];
        put: never;
        post: never;
        delete: never;
        options: never;
        head: never;
        patch: never;
        trace: never;
    };
    "/": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Some summary */
        get: operations["getEmptyOperationId"];
        put: never;
        post: never;
        delete: never;
        options: never;
        head: never;
        patch: never;
        trace: never;
    };
    "/{var}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get: never;
        put: never;
        post: never;
        delete: never;
        options: never;
        head: never;
        patch: never;
        trace: never;
    };
    "/unevaluated-properties": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Checks if unevaluetedProperties work */
        get: operations["getUnevaluatedProperties"];
        put: never;
        post: never;
        delete: never;
        options: never;
        head: never;
        patch: never;
        trace: never;
    };
}
export interface webhooks {
    newPet: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get: never;
        /** Edit new pet
        @description Edit pet. */
        put: operations["editPet"];
        /** Add a new pet to the store
        @description Add new pet to the store inventory. */
        post: operations["addPet"];
        delete: never;
        options: never;
        head: never;
        patch: never;
        trace: never;
    };
}
export interface components {
    schemas: {
        /** @description schema for a rfc7807 */
        Problem: {
            /** Format: uri
            @description A URI reference [RFC3986] that identifies the problem type. */
            type: string;
            /** @description A short, human-readable summary of the problem type. */
            title: string;
            /** @description The HTTP status code ([RFC7231], Section 6) generated by the origin server for this occurrence of the problem. */
            status: number;
            /** @description A URI reference that identifies the specific occurrence of the problem. */
            instance: string;
            /** @description A human-readable explanation specific to this occurrence of the problem. */
            detail: string;
        };
        Pet: {
            /** Format: int64 */
            id: number;
            name: string;
            none?: null;
            tag?: null | string | number;
            arr?: unknown[];
            either?: string | null;
        };
        Pets: {
            /** Format: int64 */
            id: number;
            name: string;
            none?: null;
            tag?: null | string | number;
            arr?: unknown[];
            either?: string | null;
        }[];
        Model: {
            /** @description type array */
            one?: number | string;
            /** @description type 'null' */
            two?: null;
            /** @description type array including 'null' */
            three?: string | null;
            /** @description array with no items */
            four?: unknown[];
            /** @description singular example */
            five?: string;
            /** @description exclusiveMinimum true */
            six?: unknown;
            /** @description exclusiveMinimum false */
            seven?: unknown;
            /** @description exclusiveMaximum true */
            eight?: unknown;
            /** @description exclusiveMaximum false */
            nine?: unknown;
            /** @description nullable string */
            ten?: string | null;
            /** @description file/binary */
            eleven?: unknown;
        };
        person: {
            /** @description Person ID */
            id: number | string;
            name?: string;
            /** @enum {string|integer} */
            gender?: "male" | "female" | "unknown";
            /** @description location can be null, set using `nullable` property thats supported by OpenAPI `3.0.x` */
            location?: string | null;
            /** @description Age of Person */
            age?: number;
            /** @description One URL or Array or URLs or set to false */
            photoUrls?: string[] | boolean | string;
            /** @description comma separated list of hobbies or an array of object */
            hobby?: string | {
                hobbyRank?: number;
                hobbyName?: string;
            }[];
            empty?: unknown;
        };
    };
    responses: never;
    parameters: never;
    requestBodies: never;
    headers: never;
    pathItems: never;
}
export type $defs = Record<string, never>;
interface operations {
    getTest: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description 200 */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": [
                        string
                    ];
                };
            };
            /** @description An error response */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    listPets: {
        parameters: {
            query?: {
                /** @description How many items to return at one time (max 100) */
                limit?: number;
            };
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description A paged array of pets */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        /** Format: int64 */
                        id: number;
                        name: string;
                        none?: null;
                        tag?: null | string | number;
                        arr?: unknown[];
                        either?: string | null;
                    }[];
                };
            };
            /** @description An error response */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    listPetsModel: {
        parameters: {
            query?: {
                /** @description How many items to return at one time (max 100) */
                limit?: number;
            };
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description A paged array of model */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        /** @description type array */
                        one?: number | string;
                        /** @description type 'null' */
                        two?: null;
                        /** @description type array including 'null' */
                        three?: string | null;
                        /** @description array with no items */
                        four?: unknown[];
                        /** @description singular example */
                        five?: string;
                        /** @description exclusiveMinimum true */
                        six?: unknown;
                        /** @description exclusiveMinimum false */
                        seven?: unknown;
                        /** @description exclusiveMaximum true */
                        eight?: unknown;
                        /** @description exclusiveMaximum false */
                        nine?: unknown;
                        /** @description nullable string */
                        ten?: string | null;
                        /** @description file/binary */
                        eleven?: unknown;
                    };
                };
            };
            /** @description An error response */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    listPetsPerson: {
        parameters: {
            query?: {
                /** @description How many items to return at one time (max 100) */
                limit?: number;
            };
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description A paged array of person */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        /** @description Person ID */
                        id: number | string;
                        name?: string;
                        /** @enum {string|integer} */
                        gender?: "male" | "female" | "unknown";
                        /** @description location can be null, set using `nullable` property thats supported by OpenAPI `3.0.x` */
                        location?: string | null;
                        /** @description Age of Person */
                        age?: number;
                        /** @description One URL or Array or URLs or set to false */
                        photoUrls?: string[] | boolean | string;
                        /** @description comma separated list of hobbies or an array of object */
                        hobby?: string | {
                            hobbyRank?: number;
                            hobbyName?: string;
                        }[];
                        empty?: unknown;
                    };
                };
            };
            /** @description An error response */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    getEmptyOperationId: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: never;
    };
    getUnevaluatedProperties: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description OK */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        foo?: string;
                    } & {
                        bar?: number;
                    };
                };
            };
            /** @description An error response */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    editPet: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: {
            content: {
                "application/octet-stream": unknown;
            };
        };
        responses: {
            /** @description Return a 200 status to indicate that the data was received successfully */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description An error response */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    addPet: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** @description Information about a new pet in the system */
        requestBody?: {
            content: {
                "multipart/form-data": {
                    orderId?: number;
                    fileName?: string;
                };
            };
        };
        responses: {
            /** @description Return a 200 status to indicate that the data was received successfully */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Invalid input */
            405: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
}
