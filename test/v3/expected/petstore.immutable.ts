/**
 * This file was auto-generated by openapi-typescript.
 * Do not make direct changes to the file.
 */

export interface paths {
  readonly '/pet': {
    readonly put: operations['updatePet']
    readonly post: operations['addPet']
  }
  readonly '/pet/findByStatus': {
    /** Multiple status values can be provided with comma separated strings */
    readonly get: operations['findPetsByStatus']
  }
  readonly '/pet/findByTags': {
    /** Muliple tags can be provided with comma separated strings. Use         tag1, tag2, tag3 for testing. */
    readonly get: operations['findPetsByTags']
  }
  readonly '/pet/{petId}': {
    /** Returns a single pet */
    readonly get: operations['getPetById']
    readonly post: operations['updatePetWithForm']
    readonly delete: operations['deletePet']
  }
  readonly '/pet/{petId}/uploadImage': {
    readonly post: operations['uploadFile']
  }
  readonly '/store/inventory': {
    /** Returns a map of status codes to quantities */
    readonly get: operations['getInventory']
  }
  readonly '/store/order': {
    readonly post: operations['placeOrder']
  }
  readonly '/store/order/{orderId}': {
    /** For valid response try integer IDs with value >= 1 and <= 10.         Other values will generated exceptions */
    readonly get: operations['getOrderById']
    /** For valid response try integer IDs with positive integer value.         Negative or non-integer values will generate API errors */
    readonly delete: operations['deleteOrder']
  }
  readonly '/user': {
    /** This can only be done by the logged in user. */
    readonly post: operations['createUser']
  }
  readonly '/user/createWithArray': {
    readonly post: operations['createUsersWithArrayInput']
  }
  readonly '/user/createWithList': {
    readonly post: operations['createUsersWithListInput']
  }
  readonly '/user/login': {
    readonly get: operations['loginUser']
  }
  readonly '/user/logout': {
    readonly get: operations['logoutUser']
  }
  readonly '/user/{username}': {
    readonly get: operations['getUserByName']
    /** This can only be done by the logged in user. */
    readonly put: operations['updateUser']
    /** This can only be done by the logged in user. */
    readonly delete: operations['deleteUser']
  }
}

export interface components {
  readonly schemas: {
    readonly Order: {
      /** Format: int64 */
      readonly id?: number
      /** Format: int64 */
      readonly petId?: number
      /** Format: int32 */
      readonly quantity?: number
      /** Format: date-time */
      readonly shipDate?: string
      /**
       * @description Order Status
       * @enum {string}
       */
      readonly status?: 'placed' | 'approved' | 'delivered'
      readonly complete?: boolean
    }
    readonly Category: {
      /** Format: int64 */
      readonly id?: number
      readonly name?: string
    }
    readonly User: {
      /** Format: int64 */
      readonly id?: number
      readonly username?: string
      readonly firstName?: string
      readonly lastName?: string
      readonly email?: string
      readonly password?: string
      readonly phone?: string
      /**
       * Format: int32
       * @description User Status
       */
      readonly userStatus?: number
    }
    readonly Tag: {
      /** Format: int64 */
      readonly id?: number
      readonly name?: string
    }
    readonly Pet: {
      /** Format: int64 */
      readonly id?: number
      readonly category?: components['schemas']['Category']
      /** @example doggie */
      readonly name: string
      readonly photoUrls: readonly string[]
      readonly tags?: readonly components['schemas']['Tag'][]
      /**
       * @description pet status in the store
       * @enum {string}
       */
      readonly status?: 'available' | 'pending' | 'sold'
    }
    readonly ApiResponse: {
      /** Format: int32 */
      readonly code?: number
      readonly type?: string
      readonly message?: string
    }
  }
}

export interface operations {
  readonly updatePet: {
    readonly responses: {
      /** Invalid ID supplied */
      readonly 400: unknown
      /** Pet not found */
      readonly 404: unknown
      /** Validation exception */
      readonly 405: unknown
    }
    /** Pet object that needs to be added to the store */
    readonly requestBody: {
      readonly content: {
        readonly 'application/json': components['schemas']['Pet']
        readonly 'application/xml': components['schemas']['Pet']
      }
    }
  }
  readonly addPet: {
    readonly responses: {
      /** Invalid input */
      readonly 405: unknown
    }
    /** Pet object that needs to be added to the store */
    readonly requestBody: {
      readonly content: {
        readonly 'application/json': components['schemas']['Pet']
        readonly 'application/xml': components['schemas']['Pet']
      }
    }
  }
  /** Multiple status values can be provided with comma separated strings */
  readonly findPetsByStatus: {
    readonly parameters: {
      readonly query: {
        /** Status values that need to be considered for filter */
        readonly status: readonly ('available' | 'pending' | 'sold')[]
      }
    }
    readonly responses: {
      /** successful operation */
      readonly 200: {
        readonly content: {
          readonly 'application/xml': readonly components['schemas']['Pet'][]
          readonly 'application/json': readonly components['schemas']['Pet'][]
        }
      }
      /** Invalid status value */
      readonly 400: unknown
    }
  }
  /** Muliple tags can be provided with comma separated strings. Use         tag1, tag2, tag3 for testing. */
  readonly findPetsByTags: {
    readonly parameters: {
      readonly query: {
        /** Tags to filter by */
        readonly tags: readonly string[]
      }
    }
    readonly responses: {
      /** successful operation */
      readonly 200: {
        readonly content: {
          readonly 'application/xml': readonly components['schemas']['Pet'][]
          readonly 'application/json': readonly components['schemas']['Pet'][]
        }
      }
      /** Invalid tag value */
      readonly 400: unknown
    }
  }
  /** Returns a single pet */
  readonly getPetById: {
    readonly parameters: {
      readonly path: {
        /** ID of pet to return */
        readonly petId: number
      }
    }
    readonly responses: {
      /** successful operation */
      readonly 200: {
        readonly content: {
          readonly 'application/xml': components['schemas']['Pet']
          readonly 'application/json': components['schemas']['Pet']
        }
      }
      /** Invalid ID supplied */
      readonly 400: unknown
      /** Pet not found */
      readonly 404: unknown
    }
  }
  readonly updatePetWithForm: {
    readonly parameters: {
      readonly path: {
        /** ID of pet that needs to be updated */
        readonly petId: number
      }
    }
    readonly responses: {
      /** Invalid input */
      readonly 405: unknown
    }
    readonly requestBody: {
      readonly content: {
        readonly 'application/x-www-form-urlencoded': {
          /** @description Updated name of the pet */
          readonly name?: string
          /** @description Updated status of the pet */
          readonly status?: string
        }
      }
    }
  }
  readonly deletePet: {
    readonly parameters: {
      readonly header: {
        readonly api_key?: string
      }
      readonly path: {
        /** Pet id to delete */
        readonly petId: number
      }
    }
    readonly responses: {
      /** Invalid ID supplied */
      readonly 400: unknown
      /** Pet not found */
      readonly 404: unknown
    }
  }
  readonly uploadFile: {
    readonly parameters: {
      readonly path: {
        /** ID of pet to update */
        readonly petId: number
      }
    }
    readonly responses: {
      /** successful operation */
      readonly 200: {
        readonly content: {
          readonly 'application/json': components['schemas']['ApiResponse']
        }
      }
    }
    readonly requestBody: {
      readonly content: {
        readonly 'multipart/form-data': {
          /** @description Additional data to pass to server */
          readonly additionalMetadata?: string
          /**
           * Format: binary
           * @description file to upload
           */
          readonly file?: string
        }
      }
    }
  }
  /** Returns a map of status codes to quantities */
  readonly getInventory: {
    readonly responses: {
      /** successful operation */
      readonly 200: {
        readonly content: {
          readonly 'application/json': { readonly [key: string]: number }
        }
      }
    }
  }
  readonly placeOrder: {
    readonly responses: {
      /** successful operation */
      readonly 200: {
        readonly content: {
          readonly 'application/xml': components['schemas']['Order']
          readonly 'application/json': components['schemas']['Order']
        }
      }
      /** Invalid Order */
      readonly 400: unknown
    }
    /** order placed for purchasing the pet */
    readonly requestBody: {
      readonly content: {
        readonly '*/*': components['schemas']['Order']
      }
    }
  }
  /** For valid response try integer IDs with value >= 1 and <= 10.         Other values will generated exceptions */
  readonly getOrderById: {
    readonly parameters: {
      readonly path: {
        /** ID of pet that needs to be fetched */
        readonly orderId: number
      }
    }
    readonly responses: {
      /** successful operation */
      readonly 200: {
        readonly content: {
          readonly 'application/xml': components['schemas']['Order']
          readonly 'application/json': components['schemas']['Order']
        }
      }
      /** Invalid ID supplied */
      readonly 400: unknown
      /** Order not found */
      readonly 404: unknown
    }
  }
  /** For valid response try integer IDs with positive integer value.         Negative or non-integer values will generate API errors */
  readonly deleteOrder: {
    readonly parameters: {
      readonly path: {
        /** ID of the order that needs to be deleted */
        readonly orderId: number
      }
    }
    readonly responses: {
      /** Invalid ID supplied */
      readonly 400: unknown
      /** Order not found */
      readonly 404: unknown
    }
  }
  /** This can only be done by the logged in user. */
  readonly createUser: {
    readonly responses: {
      /** successful operation */
      readonly default: unknown
    }
    /** Created user object */
    readonly requestBody: {
      readonly content: {
        readonly '*/*': components['schemas']['User']
      }
    }
  }
  readonly createUsersWithArrayInput: {
    readonly responses: {
      /** successful operation */
      readonly default: unknown
    }
    /** List of user object */
    readonly requestBody: {
      readonly content: {
        readonly '*/*': readonly components['schemas']['User'][]
      }
    }
  }
  readonly createUsersWithListInput: {
    readonly responses: {
      /** successful operation */
      readonly default: unknown
    }
    /** List of user object */
    readonly requestBody: {
      readonly content: {
        readonly '*/*': readonly components['schemas']['User'][]
      }
    }
  }
  readonly loginUser: {
    readonly parameters: {
      readonly query: {
        /** The user name for login */
        readonly username: string
        /** The password for login in clear text */
        readonly password: string
      }
    }
    readonly responses: {
      /** successful operation */
      readonly 200: {
        readonly headers: {
          /** calls per hour allowed by the user */
          readonly 'X-Rate-Limit'?: number
          /** date in UTC when token expires */
          readonly 'X-Expires-After'?: string
        }
        readonly content: {
          readonly 'application/xml': string
          readonly 'application/json': string
        }
      }
      /** Invalid username/password supplied */
      readonly 400: unknown
    }
  }
  readonly logoutUser: {
    readonly responses: {
      /** successful operation */
      readonly default: unknown
    }
  }
  readonly getUserByName: {
    readonly parameters: {
      readonly path: {
        /** The name that needs to be fetched. Use user1 for testing. */
        readonly username: string
      }
    }
    readonly responses: {
      /** successful operation */
      readonly 200: {
        readonly content: {
          readonly 'application/xml': components['schemas']['User']
          readonly 'application/json': components['schemas']['User']
        }
      }
      /** Invalid username supplied */
      readonly 400: unknown
      /** User not found */
      readonly 404: unknown
    }
  }
  /** This can only be done by the logged in user. */
  readonly updateUser: {
    readonly parameters: {
      readonly path: {
        /** name that need to be updated */
        readonly username: string
      }
    }
    readonly responses: {
      /** Invalid user supplied */
      readonly 400: unknown
      /** User not found */
      readonly 404: unknown
    }
    /** Updated user object */
    readonly requestBody: {
      readonly content: {
        readonly '*/*': components['schemas']['User']
      }
    }
  }
  /** This can only be done by the logged in user. */
  readonly deleteUser: {
    readonly parameters: {
      readonly path: {
        /** The name that needs to be deleted */
        readonly username: string
      }
    }
    readonly responses: {
      /** Invalid username supplied */
      readonly 400: unknown
      /** User not found */
      readonly 404: unknown
    }
  }
}

export interface external {}
