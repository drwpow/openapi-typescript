/**
 * This file was auto-generated by openapi-typescript.
 * Do not make direct changes to the file.
 */

export interface paths {
  readonly '/cats': {
    readonly post: {
      readonly responses: {
        readonly 200: {
          readonly content: {
            readonly 'application/json': {
              readonly id: string
              readonly name: string
              readonly colors:
                | readonly string[]
                | readonly {
                    readonly id: string
                    readonly name: string
                  }[]
            }
          }
        }
      }
    }
  }
}

export interface components {}

export interface operations {}

export interface external {}
