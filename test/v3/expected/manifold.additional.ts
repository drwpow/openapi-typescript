/**
 * This file was auto-generated by openapi-typescript.
 * Do not make direct changes to the file.
 */

export interface paths {
  '/regions/': {
    get: {
      parameters: {
        query: {
          /** Filter results to only include the regions that have this location. */
          location?: string
          /**
           * Filter results to only include the regions that are on this
           * platform.
           */
          platform?: string
        }
      }
      responses: {
        /** A list of regions. */
        200: {
          content: {
            'application/json': components['schemas']['Region'][]
          }
        }
        /** Unexpected Error */
        500: {
          content: {
            'application/json': components['schemas']['Error']
          }
        }
      }
    }
    post: {
      responses: {
        /** Complete region object */
        201: {
          content: {
            'application/json': components['schemas']['Region']
          }
        }
        /** Invalid request provided */
        400: {
          content: {
            'application/json': components['schemas']['Error']
          }
        }
        /** Region already exists for that platform and location */
        409: {
          content: {
            'application/json': components['schemas']['Error']
          }
        }
        /** Unexpected Error */
        500: {
          content: {
            'application/json': components['schemas']['Error']
          }
        }
      }
      /** Region create request */
      requestBody: {
        content: {
          'application/json': components['schemas']['CreateRegion']
        }
      }
    }
  }
  '/regions/{id}': {
    get: {
      parameters: {
        path: {
          /** ID of the region to lookup, stored as a base32 encoded 18 byte identifier. */
          id: string
        }
      }
      responses: {
        /** A region. */
        200: {
          content: {
            'application/json': components['schemas']['Region']
          }
        }
        /** Provided Region ID is Invalid */
        400: {
          content: {
            'application/json': components['schemas']['Error']
          }
        }
        /** Region could not be found */
        404: {
          content: {
            'application/json': components['schemas']['Error']
          }
        }
        /** Unexpected Error */
        500: {
          content: {
            'application/json': components['schemas']['Error']
          }
        }
      }
    }
    patch: {
      parameters: {
        path: {
          /** ID of the region to lookup, stored as a base32 encoded 18 byte identifier. */
          id: string
        }
      }
      responses: {
        /** Complete region object */
        200: {
          content: {
            'application/json': components['schemas']['Region']
          }
        }
        /** Invalid request provided */
        400: {
          content: {
            'application/json': components['schemas']['Error']
          }
        }
        /** Unexpected Error */
        500: {
          content: {
            'application/json': components['schemas']['Error']
          }
        }
      }
      /** Region update request */
      requestBody: {
        content: {
          'application/json': components['schemas']['UpdateRegion']
        }
      }
    }
  }
  '/providers/': {
    get: {
      parameters: {
        query: {
          /** Filter results to only include those that have this label. */
          label?: string
        }
      }
      responses: {
        /** A list of providers. */
        200: {
          content: {
            'application/json': components['schemas']['Provider'][]
          }
        }
        /** Unexpected Error */
        500: {
          content: {
            'application/json': components['schemas']['Error']
          }
        }
      }
    }
    post: {
      responses: {
        /** Complete provider object */
        201: {
          content: {
            'application/json': components['schemas']['Provider']
          }
        }
        /** Invalid request provided */
        400: {
          content: {
            'application/json': components['schemas']['Error']
          }
        }
        /** Forbidden */
        403: {
          content: {
            'application/json': components['schemas']['Error']
          }
        }
        /** Provider already exists with that label */
        409: {
          content: {
            'application/json': components['schemas']['Error']
          }
        }
        /** Unexpected Error */
        500: {
          content: {
            'application/json': components['schemas']['Error']
          }
        }
      }
      /** Provider create request */
      requestBody: {
        content: {
          'application/json': components['schemas']['CreateProvider']
        }
      }
    }
  }
  '/providers/{id}': {
    get: {
      parameters: {
        path: {
          /** ID of the provider to lookup, stored as a base32 encoded 18 byte identifier. */
          id: string
        }
      }
      responses: {
        /** A provider. */
        200: {
          content: {
            'application/json': components['schemas']['Provider']
          }
        }
        /** Unknown provider error */
        404: {
          content: {
            'application/json': components['schemas']['Error']
          }
        }
        /** Unexpected Error */
        500: {
          content: {
            'application/json': components['schemas']['Error']
          }
        }
      }
    }
    patch: {
      parameters: {
        path: {
          /** ID of the provider to update, stored as a base32 encoded 18 byte identifier. */
          id: string
        }
      }
      responses: {
        /** Complete provider object */
        200: {
          content: {
            'application/json': components['schemas']['Provider']
          }
        }
        /** Invalid request provided */
        400: {
          content: {
            'application/json': components['schemas']['Error']
          }
        }
        /** Forbidden */
        403: {
          content: {
            'application/json': components['schemas']['Error']
          }
        }
        /** Provider not found */
        404: {
          content: {
            'application/json': components['schemas']['Error']
          }
        }
        /** Provider already exists with that label */
        409: {
          content: {
            'application/json': components['schemas']['Error']
          }
        }
        /** Unexpected Error */
        500: {
          content: {
            'application/json': components['schemas']['Error']
          }
        }
      }
      /** Provider update request */
      requestBody: {
        content: {
          'application/json': components['schemas']['UpdateProvider']
        }
      }
    }
  }
  '/products/': {
    get: {
      parameters: {
        query: {
          /**
           * Base32 encoded 18 byte identifier of the provider that these
           * products must belong to.
           */
          provider_id?: string
          /** Filter results to only include those that have this label. */
          label?: string
          /** Return only products matching at least one of the tags. */
          tags?: string[]
        }
      }
      responses: {
        /** A product. */
        200: {
          content: {
            'application/json': components['schemas']['Product'][]
          }
        }
        /** Invalid provider_id supplied */
        400: {
          content: {
            'application/json': components['schemas']['Error']
          }
        }
        /** Unexpected Error */
        500: {
          content: {
            'application/json': components['schemas']['Error']
          }
        }
      }
    }
    post: {
      responses: {
        /** Complete product object */
        201: {
          content: {
            'application/json': components['schemas']['Product']
          }
        }
        /** Invalid request provided */
        400: {
          content: {
            'application/json': components['schemas']['Error']
          }
        }
        /** Forbidden */
        403: {
          content: {
            'application/json': components['schemas']['Error']
          }
        }
        /** Product already exists with that label */
        409: {
          content: {
            'application/json': components['schemas']['Error']
          }
        }
        /** Unexpected Error */
        500: {
          content: {
            'application/json': components['schemas']['Error']
          }
        }
      }
      /** Product create request */
      requestBody: {
        content: {
          'application/json': components['schemas']['CreateProduct']
        }
      }
    }
  }
  '/internal/products': {
    get: {
      parameters: {
        query: {
          /**
           * Base32 encoded 18 byte identifier of the provider that these
           * products must belong to.
           */
          provider_id?: string
          /** Filter results to only include those that have this label. */
          label?: string
          /** Return only products matching at least one of the tags. */
          tags?: string[]
          /** Return product listings without plan information */
          include_plans?: boolean
        }
      }
      responses: {
        /** A product. */
        200: {
          content: {
            'application/json': components['schemas']['ExpandedProduct'][]
          }
        }
        /** Invalid provider_id supplied */
        400: {
          content: {
            'application/json': components['schemas']['Error']
          }
        }
        /** Unexpected Error */
        500: {
          content: {
            'application/json': components['schemas']['Error']
          }
        }
      }
    }
  }
  '/products/{id}': {
    get: {
      parameters: {
        path: {
          /**
           * ID of the product to lookup, stored as a base32 encoded 18 byte
           * identifier.
           */
          id: string
        }
      }
      responses: {
        /** A product. */
        200: {
          content: {
            'application/json': components['schemas']['Product']
          }
        }
        /** Invalid Product ID */
        400: {
          content: {
            'application/json': components['schemas']['Error']
          }
        }
        /** Product not found error */
        404: {
          content: {
            'application/json': components['schemas']['Error']
          }
        }
        /** Unexpected error */
        500: {
          content: {
            'application/json': components['schemas']['Error']
          }
        }
      }
    }
    patch: {
      parameters: {
        path: {
          /**
           * ID of the product to lookup, stored as a base32 encoded 18 byte
           * identifier.
           */
          id: string
        }
      }
      responses: {
        /** Complete product object */
        200: {
          content: {
            'application/json': components['schemas']['Product']
          }
        }
        /** Invalid Product ID */
        400: {
          content: {
            'application/json': components['schemas']['Error']
          }
        }
        /** Product not found error */
        404: {
          content: {
            'application/json': components['schemas']['Error']
          }
        }
        /** Unexpected error */
        500: {
          content: {
            'application/json': components['schemas']['Error']
          }
        }
      }
      /** Product update request */
      requestBody: {
        content: {
          'application/json': components['schemas']['UpdateProduct']
        }
      }
    }
  }
  '/plans/{id}': {
    get: {
      parameters: {
        path: {
          /**
           * ID of the plan to lookup, stored as a base32 encoded 18 byte
           * identifier.
           */
          id: string
        }
      }
      responses: {
        /** A plan. */
        200: {
          content: {
            'application/json': components['schemas']['ExpandedPlan']
          }
        }
        /** Invalid Plan ID Provided */
        400: {
          content: {
            'application/json': components['schemas']['Error']
          }
        }
        /** Unknown plan error */
        404: {
          content: {
            'application/json': components['schemas']['Error']
          }
        }
        /** Unexpected error */
        default: {
          content: {
            'application/json': components['schemas']['Error']
          }
        }
      }
    }
    patch: {
      parameters: {
        path: {
          /**
           * ID of the plan to lookup, stored as a base32 encoded 18 byte
           * identifier.
           */
          id: string
        }
      }
      responses: {
        /** Complete product plan */
        200: {
          content: {
            'application/json': components['schemas']['Plan']
          }
        }
        /** Invalid Plan ID */
        400: {
          content: {
            'application/json': components['schemas']['Error']
          }
        }
        /** Plan not found error */
        404: {
          content: {
            'application/json': components['schemas']['Error']
          }
        }
        /** Unexpected error */
        500: {
          content: {
            'application/json': components['schemas']['Error']
          }
        }
      }
      /** Plan update request */
      requestBody: {
        content: {
          'application/json': components['schemas']['UpdatePlan']
        }
      }
    }
  }
  '/plans/': {
    get: {
      parameters: {
        query: {
          /** Return the plans that are associated with this product. */
          product_id: string[]
          /** Filter results to only include those that have this label. */
          label?: string
        }
      }
      responses: {
        /** A list of plans for the given product. */
        200: {
          content: {
            'application/json': components['schemas']['ExpandedPlan'][]
          }
        }
        /** Invalid Parameters Provided */
        400: {
          content: {
            'application/json': components['schemas']['Error']
          }
        }
        /** Could not find product */
        404: {
          content: {
            'application/json': components['schemas']['Error']
          }
        }
        /** Unexpected error */
        500: {
          content: {
            'application/json': components['schemas']['Error']
          }
        }
      }
    }
    post: {
      responses: {
        /** Complete plan object */
        201: {
          content: {
            'application/json': components['schemas']['Plan']
          }
        }
        /** Invalid request provided */
        400: {
          content: {
            'application/json': components['schemas']['Error']
          }
        }
        /** Forbidden */
        403: {
          content: {
            'application/json': components['schemas']['Error']
          }
        }
        /** Plan already exists with that label */
        409: {
          content: {
            'application/json': components['schemas']['Error']
          }
        }
        /** Unexpected Error */
        500: {
          content: {
            'application/json': components['schemas']['Error']
          }
        }
      }
      /** Plan create request */
      requestBody: {
        content: {
          'application/json': components['schemas']['CreatePlan']
        }
      }
    }
  }
}

export interface components {
  schemas: {
    /**
     * Format: base32ID
     * @description A base32 encoded 18 byte identifier.
     */
    ID: string
    /**
     * Format: base32ID
     * @description A base32 encoded 18 byte identifier.
     */
    OptionalID: string | null
    /** @description A flexible identifier for internal or external entities. */
    FlexID: string
    /** @description A flexible identifier for internal or external entities. */
    OptionalFlexID: string | null
    /** @description A machine readable unique label, which is url safe. */
    Label: string
    /** @description A machine readable unique label, which is url safe. */
    OptionalLabel: string | null
    /** @description A machine readable unique label, which is url safe. */
    FeatureValueLabel: string
    /** @description A location of where a potential resource can be provisioned. */
    Location: string
    /** @description A name of a platform which is used to provision resources. */
    Platform: string
    /** @description A name of an entity which is displayed to a human. */
    Name: string
    /** @description A name of an entity which is displayed to a human. */
    OptionalName: string | null
    /**
     * Format: url
     * @description Logo used for Provider and Product listings.
     *
     * Must be square (same width and height) and minimum 400px. Maximum of 800px.
     */
    LogoURL: string
    /**
     * Format: url
     * @description Logo used for Provider and Product listings.
     *
     * Must be square (same width and height) and minimum 400px. Maximum of 800px.
     */
    OptionalLogoURL: string | null
    RegionBody: {
      platform: components['schemas']['Platform']
      location: components['schemas']['Location']
      name: string
      priority: number
    } & { [key: string]: unknown }
    Region: {
      id: components['schemas']['ID']
      /** @enum {string} */
      type: 'region'
      version: number
      body: components['schemas']['RegionBody']
    } & { [key: string]: unknown }
    CreateRegion: {
      body: components['schemas']['RegionBody']
    } & { [key: string]: unknown }
    UpdateRegion: {
      name: string
    } & { [key: string]: unknown }
    ProviderBody: {
      owner_id?: components['schemas']['OptionalFlexID']
      team_id?: components['schemas']['OptionalID']
      label: components['schemas']['Label']
      name: components['schemas']['Name']
      logo_url?: components['schemas']['LogoURL']
      /** Format: email */
      support_email?: string
      /** Format: url */
      documentation_url?: string
    } & { [key: string]: unknown }
    UpdateProviderBody: {
      owner_id?: components['schemas']['OptionalFlexID']
      team_id?: components['schemas']['OptionalID']
      label?: components['schemas']['OptionalLabel']
      name?: components['schemas']['OptionalName']
      logo_url?: components['schemas']['OptionalLogoURL']
      /** Format: email */
      support_email?: string | null
      /** Format: url */
      documentation_url?: string | null
    } & { [key: string]: unknown }
    Provider: {
      id: components['schemas']['ID']
      version: number
      /** @enum {string} */
      type: 'provider'
      body: components['schemas']['ProviderBody']
    } & { [key: string]: unknown }
    CreateProvider: {
      body: components['schemas']['ProviderBody']
    } & { [key: string]: unknown }
    UpdateProvider: {
      id: components['schemas']['ID']
      body: components['schemas']['UpdateProviderBody']
    } & { [key: string]: unknown }
    UpdateProduct: {
      id: components['schemas']['ID']
      body: components['schemas']['UpdateProductBody']
    } & { [key: string]: unknown }
    UpdateProductBody: {
      name?: components['schemas']['Name']
      label?: components['schemas']['Label']
      logo_url?: components['schemas']['LogoURL']
      listing?: components['schemas']['ProductListing']
      /** @description 140 character sentence positioning the product. */
      tagline?: string | null
      /** @description A list of value propositions of the product. */
      value_props?: components['schemas']['ValueProp'][] | null
      /** @description A list of getting started steps for the product */
      setup_steps?: string[] | null
      images?: components['schemas']['ProductImageURL'][] | null
      /** Format: email */
      support_email?: string | null
      /** Format: url */
      documentation_url?: string | null
      /**
       * @description URL to this Product's Terms of Service. If provided is true, then
       * a url must be set. Otherwise, provided is false.
       */
      terms_url?: string | null
      feature_types?: components['schemas']['FeatureType'][] | null
      integration?:
        | ({
            provisioning?: components['schemas']['ProductProvisioning']
            /** Format: url */
            base_url?: string | null
            /** Format: url */
            sso_url?: string | null
            /** @enum {string|null} */
            version?: 'v1' | null
            features?: {
              access_code?: boolean | null
              sso?: boolean | null
              plan_change?: boolean | null
              /**
               * @default multiple
               * @enum {string|null}
               */
              credential?: ('none' | 'single' | 'multiple' | 'unknown') | null
            } & { [key: string]: unknown }
          } & { [key: string]: unknown })
        | null
      /** @description An array of platform ids to restrict this product for. */
      platform_ids?: components['schemas']['ID'][] | null
      tags?: components['schemas']['ProductTags']
    } & { [key: string]: unknown }
    UpdatePlan: {
      id: components['schemas']['ID']
      body: components['schemas']['UpdatePlanBody']
    } & { [key: string]: unknown }
    UpdatePlanBody: {
      name?: components['schemas']['Name']
      label?: components['schemas']['Label']
      state?: components['schemas']['PlanState']
      /** @description Used in conjuction with resizable_to to set or unset the list */
      has_resize_constraints?: boolean | null
      resizable_to?: components['schemas']['PlanResizeList']
      /** @description Array of Region IDs */
      regions?: components['schemas']['ID'][] | null
      /** @description Array of Feature Values */
      features?: components['schemas']['FeatureValue'][] | null
      /**
       * @description The number of days a user gets as a free trial when subscribing to
       * this plan. Trials are valid only once per product; changing plans
       * or adding an additional subscription will not start a new trial.
       */
      trial_days?: number | null
      /** @description Dollar value in cents */
      cost?: number | null
    } & { [key: string]: unknown }
    /**
     * @description A feature type represents the different aspects of a product that are
     * offered, these features can manifest differently depending on the plan.
     */
    FeatureType: {
      label: components['schemas']['Label']
      name: components['schemas']['Name']
      /** @enum {string} */
      type: 'boolean' | 'string' | 'number'
      /** @description This sets whether or not the feature can be customized by a consumer. */
      customizable?: boolean
      /**
       * @description This sets whether or not the feature can be upgraded by the consumer after the
       * resource has provisioned. Upgrading means setting a higher value or selecting a
       * higher element in the list.
       */
      upgradable?: boolean
      /**
       * @description This sets whether or not the feature can be downgraded by the consumer after the
       * resource has provisioned. Downgrading means setting a lower value or selecting a
       * lower element in the list.
       */
      downgradable?: boolean
      /**
       * @description Sets if this feature’s value is trackable from the provider,
       * this only really affects numeric constraints.
       */
      measurable?: boolean
      values?: components['schemas']['FeatureValuesList']
    } & { [key: string]: unknown }
    /**
     * @description A list of allowable values for the feature.
     * To define values for a boolean feature type, only `true` is required,
     * using the label `true`, name and numeric_details will be ignored.
     * If the feature is set measurable it is expected that these all have a
     * `numeric_details` definition, and the plan will determine which
     * `numeric_details` set is used based on it's setting.
     */
    FeatureValuesList: components['schemas']['FeatureValueDetails'][] | null
    FeatureValueDetails: {
      label: components['schemas']['FeatureValueLabel']
      name: components['schemas']['Name']
      /**
       * @description The cost that will be added to the monthly plan cost when this value
       * is selected or is default for the plan.
       * Cost is deprecated in favor of the `price.cost` field.
       */
      cost?: number
      /**
       * @description Price describes the cost of a feature. It should be preferred over
       * the `cost` property.
       */
      price?: {
        /**
         * @description Cost is the price in cents that will be added to plan's base cost
         * when this value is selected or is default for the plan.
         * Number features should use the cost range instead.
         */
        cost?: number
        /**
         * @description When a feature is used to multiply the cost of the plan or of
         * another feature, multiply factor is used for calculation.
         * A feature cannot have both a cost and a multiply factor.
         */
        multiply_factor?: number
        formula?: components['schemas']['PriceFormula']
        /** @description Description explains how a feature is calculated to the user. */
        description?: string
      } & { [key: string]: unknown }
      numeric_details?: components['schemas']['FeatureNumericDetails']
    } & { [key: string]: unknown }
    /**
     * @description Optional container for additional details relating to numeric features.
     * This is required if the feature is measurable and numeric.
     */
    FeatureNumericDetails:
      | ({
          /**
           * @description Sets the increment at which numbers can be selected if customizable, by
           * default this is 1; for example, setting this to 8 would only allow integers
           * in increments of 8 ( 0, 8, 16, ... ). This property is not used if the
           * feature is measurable; except if it is set to 0, setting the increment to 0
           * means this numeric details has no scale, and will not be or customizable.
           * Some plans may not have a measureable or customizable feature.
           */
          increment?: number
          /** @description Minimum value that can be set by a user if customizable */
          min?: number
          /** @description Maximum value that can be set by a user if customizable */
          max?: number | null
          /** @description Applied to the end of the number for display, for example the ‘GB’ in ‘20 GB’. */
          suffix?: string | null
          cost_ranges?: components['schemas']['FeatureNumericRange'][] | null
        } & { [key: string]: unknown })
      | null
    FeatureNumericRange: {
      /**
       * @description Defines the end of the range ( inclusive ), from the previous, or 0;
       * where the cost_multiple starts taking effect. If set to -1 this defines the
       * range to infinity, or the maximum integer the system can handle
       * ( whichever comes first ).
       */
      limit?: number
      /**
       * @description An integer in 10,000,000ths of cents, will be multiplied by the
       * numeric value set in the feature to determine the cost.
       */
      cost_multiple?: number
    } & { [key: string]: unknown }
    FeatureValue: {
      feature: components['schemas']['Label']
      value: components['schemas']['FeatureValueLabel']
    } & { [key: string]: unknown }
    ValueProp: {
      /** @description Heading of a value proposition. */
      header: string
      /** @description Body of a value proposition. */
      body: string
    } & { [key: string]: unknown }
    /**
     * Format: url
     * @description Image URL used for Product listings.
     *
     * Minimum 660px wide, 400px high.
     */
    ProductImageURL: string
    /** @description List of tags for product categorization and search */
    ProductTags: components['schemas']['Label'][]
    /** @enum {string} */
    ProductState: 'available' | 'hidden' | 'grandfathered' | 'new' | 'upcoming'
    ProductListing: {
      /**
       * @description When true, everyone can see the product when requested. When false it will
       * not be visible to anyone except those on the provider team.
       */
      public?: boolean
      /**
       * @description When true, the product will be displayed in product listings alongside
       * other products. When false the product will be excluded from listings,
       * but can still be provisioned directly if it's label is known.
       * Any pages that display information about the product when not listed,
       * should indicate to webcrawlers that the content should not be indexed.
       */
      listed?: boolean
      /**
       * @description Object to hold various flags for marketing purposes only. These are values
       * that need to be stored, but should not affect decision making in code. If
       * we find ourselves in a position where we think they should, we should
       * consider refactoring our listing definition.
       */
      marketing?: {
        /**
         * @description Indicates whether or not the product is in `Beta` and should be
         * advertised as such. This does not have any impact on who can access the
         * product, it is just used to inform consumers through our clients.
         */
        beta?: boolean
        /**
         * @description Indicates whether or not the product is in `New` and should be
         * advertised as such. This does not have any impact on who can access the
         * product, it is just used to inform consumers through our clients.
         */
        new?: boolean
        /**
         * @description Indicates whether or not the product is in `New` and should be
         * advertised as such. This does not have any impact on who can access the
         * product, it is just used to inform consumers through our clients.
         */
        featured?: boolean
      } & { [key: string]: unknown }
    } & { [key: string]: unknown }
    /**
     * @description Provider Only, implies that the product should only be provisionable by the
     *   provider; so members of the provider team, no one else should be allowed.
     * Pre-Order, should not be used yet. But in the future it should allow people to
     *   pre-provision a resource for when it does go live.
     * Public, means the resource is live and everyone should be able to provision it.
     *
     * @enum {string}
     */
    ProductProvisioning: 'provider-only' | 'pre-order' | 'public'
    ProductIntegrationFeatures: {
      /**
       * @description Indicates whether or not this product supports resource transitions to
       * manifold by access_code.
       */
      access_code?: boolean
      /**
       * @description Represents whether or not this product supports Single
       * Sign On
       */
      sso?: boolean
      /**
       * @description Represents whether or not this product supports changing
       * the plan of a resource.
       */
      plan_change?: boolean
      /**
       * @description Describes how the region for a resource is specified, if
       * unspecified, then regions have no impact on this
       * resource.
       *
       * @enum {string}
       */
      region?: 'user-specified' | 'unspecified'
      /**
       * @description Describes the credential type that is supported by this product.
       *
       * * `none`: The product does not support providing any credentials
       * * `single`: Only one credential is supported at the same time.
       * * `multiple`: Multiple credentials are supported at the same time.
       * * `unknown`: The credential type is unknown.
       *
       * @default multiple
       * @enum {string}
       */
      credential?: 'none' | 'single' | 'multiple' | 'unknown'
    } & { [key: string]: unknown }
    ProductBody: {
      provider_id: components['schemas']['ID']
      label: components['schemas']['Label']
      name: components['schemas']['Name']
      state: components['schemas']['ProductState']
      listing: components['schemas']['ProductListing']
      logo_url: components['schemas']['LogoURL']
      /** @description 140 character sentence positioning the product. */
      tagline: string
      /** @description A list of value propositions of the product. */
      value_props: components['schemas']['ValueProp'][]
      /** @description A list of getting started steps for the product */
      setup_steps?: string[] | null
      images: components['schemas']['ProductImageURL'][]
      /** Format: email */
      support_email: string
      /** Format: url */
      documentation_url: string
      /**
       * @description URL to this Product's Terms of Service. If provided is true, then
       * a url must be set. Otherwise, provided is false.
       */
      terms: {
        /** Format: url */
        url?: string | null
        provided: boolean
      } & { [key: string]: unknown }
      feature_types: components['schemas']['FeatureType'][]
      billing: {
        /** @enum {string} */
        type: 'monthly-prorated' | 'monthly-anniversary' | 'annual-anniversary'
        /** @enum {string} */
        currency: 'usd'
      } & { [key: string]: unknown }
      integration: {
        provisioning: components['schemas']['ProductProvisioning']
        /** Format: url */
        base_url: string
        /** Format: url */
        sso_url?: string | null
        /** @enum {string} */
        version: 'v1'
        features: components['schemas']['ProductIntegrationFeatures']
      } & { [key: string]: unknown }
      tags?: components['schemas']['ProductTags']
    } & { [key: string]: unknown }
    Product: {
      id: components['schemas']['ID']
      version: number
      /** @enum {string} */
      type: 'product'
      body: components['schemas']['ProductBody']
    } & { [key: string]: unknown }
    CreateProduct: {
      body: components['schemas']['ProductBody']
    } & { [key: string]: unknown }
    /** @description Array of Plan IDs that this Plan can be resized to, if null all will be assumed */
    PlanResizeList: components['schemas']['ID'][] | null
    PlanBody: {
      provider_id: components['schemas']['ID']
      product_id: components['schemas']['ID']
      name: components['schemas']['Name']
      label: components['schemas']['Label']
      state: components['schemas']['PlanState']
      resizable_to?: components['schemas']['PlanResizeList']
      /** @description Array of Region IDs */
      regions: components['schemas']['ID'][]
      /** @description Array of Feature Values */
      features: components['schemas']['FeatureValue'][]
      /**
       * @description The number of days a user gets as a free trial when subscribing to
       * this plan. Trials are valid only once per product; changing plans
       * or adding an additional subscription will not start a new trial.
       */
      trial_days?: number
      /** @description Dollar value in cents. */
      cost: number
    } & { [key: string]: unknown }
    /** @enum {string} */
    PlanState: 'hidden' | 'available' | 'grandfathered' | 'unlisted'
    ExpandedPlanBody: components['schemas']['PlanBody'] &
      ({
        /** @description An array of feature definitions for the plan, as defined on the Product. */
        expanded_features: components['schemas']['ExpandedFeature'][]
        /** @description A boolean flag that indicates if a plan is free or not based on it's cost and features. */
        free: boolean
        /** @description Plan cost using its default features plus base cost. */
        defaultCost?: number
        /** @description A boolean flag that indicates if a plan has customizable features. */
        customizable?: boolean
      } & { [key: string]: unknown }) & { [key: string]: unknown }
    ExpandedFeature: components['schemas']['FeatureType'] &
      ({
        /** @description The string value set for the feature on the plan, this should only be used if the value property is null. */
        value_string: string
        value: components['schemas']['FeatureValueDetails']
      } & { [key: string]: unknown }) & { [key: string]: unknown }
    Plan: {
      id: components['schemas']['ID']
      version: number
      /** @enum {string} */
      type: 'plan'
      body: components['schemas']['PlanBody']
    } & { [key: string]: unknown }
    ExpandedPlan: {
      id: components['schemas']['ID']
      version: number
      /** @enum {string} */
      type: 'plan'
      body: components['schemas']['ExpandedPlanBody']
    } & { [key: string]: unknown }
    CreatePlan: {
      body: components['schemas']['PlanBody']
    } & { [key: string]: unknown }
    /** @description Unexpected error */
    Error: {
      /** @description The error type */
      type: string
      /** @description Explanation of the errors */
      message: string[]
    } & { [key: string]: unknown }
    /**
     * @description Describes how a feature cost should be calculated. An empty
     * string defaults to the normal price calculation using the value cost.
     * Formula uses Reverse Polish notation for statements. It supports
     * addition, subtraction and multiplication operations. Operations must be
     * grouped with parenthesis.
     * Number literals can be used for formulas. Eg: "(- feature-a#cost 500)"
     * will remove 5 dollars from the cost of feature a.
     * Multiplication operation supports either a cost multiplied by a
     * factor or a number multiplied by a factor.
     * In a plan formula the following keywords are available:
     *   - `plan#base_cost` is the base cost of a plan in cents
     *   - `plan#partial_cost` is the base cost plus its feature costs calculated
     *     so far. Feature formulas are calculated in the order they are defined,
     *     so features can refer to another feature values or the partial_cost of
     *     the plan.
     *   - `this-feature-label#multiply_factor` is the multiply_factor of this
     *     feature as a float number.
     *   - `another-feature-label#cost` is the cost of a feature matching the label
     *     in cents.
     *   - `another-feature-label#number` is the numeric value of a number feature
     * In a feature formula, plan base cost and total cost cannot be used
     */
    PriceFormula: string
    ExpandedProduct: {
      id: components['schemas']['ID']
      version: number
      /** @enum {string} */
      type: 'product'
      body: components['schemas']['ProductBody']
      plans?: components['schemas']['ExpandedPlan'][]
      provider: components['schemas']['Provider']
    } & { [key: string]: unknown }
  }
  parameters: {
    /** @description Filter results to only include those that have this label. */
    LabelFilter: string
  }
}

export interface operations {}

export interface external {}
