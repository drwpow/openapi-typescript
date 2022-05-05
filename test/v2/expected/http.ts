/**
 * This file was auto-generated by openapi-typescript.
 * Do not make direct changes to the file.
 */

export interface paths {
  "/regions/": {
    get: {
      parameters: {
        query: {
          /** Filter results to only include the regions that have this location. */
          location?: string;
          /**
           * Filter results to only include the regions that are on this
           * platform.
           */
          platform?: string;
        };
      };
      responses: {
        /** A list of regions. */
        200: {
          schema: definitions["Region"][];
        };
        /** Unexpected Error */
        500: {
          schema: definitions["Error"];
        };
      };
    };
    post: {
      parameters: {
        body: {
          /** Region create request */
          body: definitions["CreateRegion"];
        };
      };
      responses: {
        /** Complete region object */
        201: {
          schema: definitions["Region"];
        };
        /** Invalid request provided */
        400: {
          schema: definitions["Error"];
        };
        /** Region already exists for that platform and location */
        409: {
          schema: definitions["Error"];
        };
        /** Unexpected Error */
        500: {
          schema: definitions["Error"];
        };
      };
    };
  };
  "/regions/{id}": {
    get: {
      parameters: {
        path: {
          /** ID of the region to lookup, stored as a base32 encoded 18 byte identifier. */
          id: string;
        };
      };
      responses: {
        /** A region. */
        200: {
          schema: definitions["Region"];
        };
        /** Provided Region ID is Invalid */
        400: {
          schema: definitions["Error"];
        };
        /** Region could not be found */
        404: {
          schema: definitions["Error"];
        };
        /** Unexpected Error */
        500: {
          schema: definitions["Error"];
        };
      };
    };
    patch: {
      parameters: {
        path: {
          /** ID of the region to lookup, stored as a base32 encoded 18 byte identifier. */
          id: string;
        };
        body: {
          /** Region update request */
          body: definitions["UpdateRegion"];
        };
      };
      responses: {
        /** Complete region object */
        200: {
          schema: definitions["Region"];
        };
        /** Invalid request provided */
        400: {
          schema: definitions["Error"];
        };
        /** Unexpected Error */
        500: {
          schema: definitions["Error"];
        };
      };
    };
  };
  "/providers/": {
    get: {
      parameters: {
        query: {
          /** Filter results to only include those that have this label. */
          label?: parameters["LabelFilter"];
        };
      };
      responses: {
        /** A list of providers. */
        200: {
          schema: definitions["Provider"][];
        };
        /** Unexpected Error */
        500: {
          schema: definitions["Error"];
        };
      };
    };
    post: {
      parameters: {
        body: {
          /** Provider create request */
          body: definitions["CreateProvider"];
        };
      };
      responses: {
        /** Complete provider object */
        201: {
          schema: definitions["Provider"];
        };
        /** Invalid request provided */
        400: {
          schema: definitions["Error"];
        };
        /** Forbidden */
        403: {
          schema: definitions["Error"];
        };
        /** Provider already exists with that label */
        409: {
          schema: definitions["Error"];
        };
        /** Unexpected Error */
        500: {
          schema: definitions["Error"];
        };
      };
    };
  };
  "/providers/{id}": {
    get: {
      parameters: {
        path: {
          /** ID of the provider to lookup, stored as a base32 encoded 18 byte identifier. */
          id: string;
        };
      };
      responses: {
        /** A provider. */
        200: {
          schema: definitions["Provider"];
        };
        /** Unknown provider error */
        404: {
          schema: definitions["Error"];
        };
        /** Unexpected Error */
        500: {
          schema: definitions["Error"];
        };
      };
    };
    patch: {
      parameters: {
        path: {
          /** ID of the provider to update, stored as a base32 encoded 18 byte identifier. */
          id: string;
        };
        body: {
          /** Provider update request */
          body: definitions["UpdateProvider"];
        };
      };
      responses: {
        /** Complete provider object */
        200: {
          schema: definitions["Provider"];
        };
        /** Invalid request provided */
        400: {
          schema: definitions["Error"];
        };
        /** Forbidden */
        403: {
          schema: definitions["Error"];
        };
        /** Provider not found */
        404: {
          schema: definitions["Error"];
        };
        /** Provider already exists with that label */
        409: {
          schema: definitions["Error"];
        };
        /** Unexpected Error */
        500: {
          schema: definitions["Error"];
        };
      };
    };
  };
  "/products/": {
    get: {
      parameters: {
        query: {
          /**
           * Base32 encoded 18 byte identifier of the provider that these
           * products must belong to.
           */
          provider_id?: string;
          /** Filter results to only include those that have this label. */
          label?: parameters["LabelFilter"];
          /** Return only products matching at least one of the tags. */
          tags?: string[];
        };
      };
      responses: {
        /** A product. */
        200: {
          schema: definitions["Product"][];
        };
        /** Invalid provider_id supplied */
        400: {
          schema: definitions["Error"];
        };
        /** Unexpected Error */
        500: {
          schema: definitions["Error"];
        };
      };
    };
    post: {
      parameters: {
        body: {
          /** Product create request */
          body: definitions["CreateProduct"];
        };
      };
      responses: {
        /** Complete product object */
        201: {
          schema: definitions["Product"];
        };
        /** Invalid request provided */
        400: {
          schema: definitions["Error"];
        };
        /** Forbidden */
        403: {
          schema: definitions["Error"];
        };
        /** Product already exists with that label */
        409: {
          schema: definitions["Error"];
        };
        /** Unexpected Error */
        500: {
          schema: definitions["Error"];
        };
      };
    };
  };
  "/internal/products": {
    get: {
      parameters: {
        query: {
          /**
           * Base32 encoded 18 byte identifier of the provider that these
           * products must belong to.
           */
          provider_id?: string;
          /** Filter results to only include those that have this label. */
          label?: parameters["LabelFilter"];
          /** Return only products matching at least one of the tags. */
          tags?: string[];
          /** Return product listings without plan information */
          include_plans?: boolean;
        };
      };
      responses: {
        /** A product. */
        200: {
          schema: definitions["ExpandedProduct"][];
        };
        /** Invalid provider_id supplied */
        400: {
          schema: definitions["Error"];
        };
        /** Unexpected Error */
        500: {
          schema: definitions["Error"];
        };
      };
    };
  };
  "/products/{id}": {
    get: {
      parameters: {
        path: {
          /**
           * ID of the product to lookup, stored as a base32 encoded 18 byte
           * identifier.
           */
          id: string;
        };
      };
      responses: {
        /** A product. */
        200: {
          schema: definitions["Product"];
        };
        /** Invalid Product ID */
        400: {
          schema: definitions["Error"];
        };
        /** Product not found error */
        404: {
          schema: definitions["Error"];
        };
        /** Unexpected error */
        500: {
          schema: definitions["Error"];
        };
      };
    };
    patch: {
      parameters: {
        path: {
          /**
           * ID of the product to lookup, stored as a base32 encoded 18 byte
           * identifier.
           */
          id: string;
        };
        body: {
          /** Product update request */
          body: definitions["UpdateProduct"];
        };
      };
      responses: {
        /** Complete product object */
        200: {
          schema: definitions["Product"];
        };
        /** Invalid Product ID */
        400: {
          schema: definitions["Error"];
        };
        /** Product not found error */
        404: {
          schema: definitions["Error"];
        };
        /** Unexpected error */
        500: {
          schema: definitions["Error"];
        };
      };
    };
  };
  "/plans/{id}": {
    get: {
      parameters: {
        path: {
          /**
           * ID of the plan to lookup, stored as a base32 encoded 18 byte
           * identifier.
           */
          id: string;
        };
      };
      responses: {
        /** A plan. */
        200: {
          schema: definitions["ExpandedPlan"];
        };
        /** Invalid Plan ID Provided */
        400: {
          schema: definitions["Error"];
        };
        /** Unknown plan error */
        404: {
          schema: definitions["Error"];
        };
        /** Unexpected error */
        default: {
          schema: definitions["Error"];
        };
      };
    };
    patch: {
      parameters: {
        path: {
          /**
           * ID of the plan to lookup, stored as a base32 encoded 18 byte
           * identifier.
           */
          id: string;
        };
        body: {
          /** Plan update request */
          body: definitions["UpdatePlan"];
        };
      };
      responses: {
        /** Complete product plan */
        200: {
          schema: definitions["Plan"];
        };
        /** Invalid Plan ID */
        400: {
          schema: definitions["Error"];
        };
        /** Plan not found error */
        404: {
          schema: definitions["Error"];
        };
        /** Unexpected error */
        500: {
          schema: definitions["Error"];
        };
      };
    };
  };
  "/plans/": {
    get: {
      parameters: {
        query: {
          /** Return the plans that are associated with this product. */
          product_id: string[];
          /** Filter results to only include those that have this label. */
          label?: parameters["LabelFilter"];
        };
      };
      responses: {
        /** A list of plans for the given product. */
        200: {
          schema: definitions["ExpandedPlan"][];
        };
        /** Invalid Parameters Provided */
        400: {
          schema: definitions["Error"];
        };
        /** Could not find product */
        404: {
          schema: definitions["Error"];
        };
        /** Unexpected error */
        500: {
          schema: definitions["Error"];
        };
      };
    };
    post: {
      parameters: {
        body: {
          /** Plan create request */
          body: definitions["CreatePlan"];
        };
      };
      responses: {
        /** Complete plan object */
        201: {
          schema: definitions["Plan"];
        };
        /** Invalid request provided */
        400: {
          schema: definitions["Error"];
        };
        /** Forbidden */
        403: {
          schema: definitions["Error"];
        };
        /** Plan already exists with that label */
        409: {
          schema: definitions["Error"];
        };
        /** Unexpected Error */
        500: {
          schema: definitions["Error"];
        };
      };
    };
  };
}

export interface definitions {
  /**
   * Format: base32ID
   * @description A base32 encoded 18 byte identifier.
   */
  ID: string;
  /**
   * Format: base32ID
   * @description A base32 encoded 18 byte identifier.
   */
  OptionalID: string;
  /** @description A flexible identifier for internal or external entities. */
  FlexID: string;
  /** @description A flexible identifier for internal or external entities. */
  OptionalFlexID: string;
  /** @description A machine readable unique label, which is url safe. */
  Label: string;
  /** @description A machine readable unique label, which is url safe. */
  OptionalLabel: string;
  /** @description A machine readable unique label, which is url safe. */
  FeatureValueLabel: string;
  /** @description A location of where a potential resource can be provisioned. */
  Location: string;
  /** @description A name of a platform which is used to provision resources. */
  Platform: string;
  /** @description A name of an entity which is displayed to a human. */
  Name: string;
  /** @description A name of an entity which is displayed to a human. */
  OptionalName: string;
  /**
   * Format: url
   * @description Logo used for Provider and Product listings.
   *
   * Must be square (same width and height) and minimum 400px. Maximum of 800px.
   */
  LogoURL: string;
  /**
   * Format: url
   * @description Logo used for Provider and Product listings.
   *
   * Must be square (same width and height) and minimum 400px. Maximum of 800px.
   */
  OptionalLogoURL: string;
  RegionBody: {
    platform: definitions["Platform"];
    location: definitions["Location"];
    name: string;
    priority: number;
  };
  Region: {
    id: definitions["ID"];
    /** @enum {string} */
    type: "region";
    /** @enum {integer} */
    version: 1;
    body: definitions["RegionBody"];
  };
  CreateRegion: {
    body: definitions["RegionBody"];
  };
  UpdateRegion: {
    name: string;
  };
  ProviderBody: {
    owner_id?: definitions["OptionalFlexID"];
    team_id?: definitions["OptionalID"];
    label: definitions["Label"];
    name: definitions["Name"];
    logo_url?: definitions["LogoURL"];
    /** Format: email */
    support_email?: string;
    /** Format: url */
    documentation_url?: string;
  };
  UpdateProviderBody: {
    owner_id?: definitions["OptionalFlexID"];
    team_id?: definitions["OptionalID"];
    label?: definitions["OptionalLabel"];
    name?: definitions["OptionalName"];
    logo_url?: definitions["OptionalLogoURL"];
    /** Format: email */
    support_email?: string;
    /** Format: url */
    documentation_url?: string;
  };
  Provider: {
    id: definitions["ID"];
    /** @enum {integer} */
    version: 1;
    /** @enum {string} */
    type: "provider";
    body: definitions["ProviderBody"];
  };
  CreateProvider: {
    body: definitions["ProviderBody"];
  };
  UpdateProvider: {
    id: definitions["ID"];
    body: definitions["UpdateProviderBody"];
  };
  UpdateProduct: {
    id: definitions["ID"];
    body: definitions["UpdateProductBody"];
  };
  UpdateProductBody: {
    name?: definitions["Name"];
    label?: definitions["Label"];
    logo_url?: definitions["LogoURL"];
    listing?: definitions["ProductListing"];
    /** @description 140 character sentence positioning the product. */
    tagline?: string;
    /** @description A list of value propositions of the product. */
    value_props?: definitions["ValueProp"][];
    /** @description A list of getting started steps for the product */
    setup_steps?: string[];
    images?: definitions["ProductImageURL"][];
    /** Format: email */
    support_email?: string;
    /** Format: url */
    documentation_url?: string;
    /**
     * @description URL to this Product's Terms of Service. If provided is true, then
     * a url must be set. Otherwise, provided is false.
     */
    terms_url?: string;
    feature_types?: definitions["FeatureType"][];
    integration?: {
      provisioning?: definitions["ProductProvisioning"];
      /** Format: url */
      base_url?: string;
      /** Format: url */
      sso_url?: string;
      /** @enum {string} */
      version?: "v1";
      /** @default {} */
      features?: {
        access_code?: boolean;
        sso?: boolean;
        plan_change?: boolean;
        /**
         * @default multiple
         * @enum {string}
         */
        credential?: "none" | "single" | "multiple" | "unknown";
      };
    };
    /** @description An array of platform ids to restrict this product for. */
    platform_ids?: definitions["ID"][];
    tags?: definitions["ProductTags"];
  };
  UpdatePlan: {
    id: definitions["ID"];
    body: definitions["UpdatePlanBody"];
  };
  UpdatePlanBody: {
    name?: definitions["Name"];
    label?: definitions["Label"];
    state?: definitions["PlanState"];
    /** @description Used in conjuction with resizable_to to set or unset the list */
    has_resize_constraints?: boolean;
    resizable_to?: definitions["PlanResizeList"];
    /** @description Array of Region IDs */
    regions?: definitions["ID"][];
    /** @description Array of Feature Values */
    features?: definitions["FeatureValue"][];
    /**
     * @description The number of days a user gets as a free trial when subscribing to
     * this plan. Trials are valid only once per product; changing plans
     * or adding an additional subscription will not start a new trial.
     */
    trial_days?: number;
    /** @description Dollar value in cents */
    cost?: number;
  };
  /**
   * @description A feature type represents the different aspects of a product that are
   * offered, these features can manifest differently depending on the plan.
   */
  FeatureType: {
    label: definitions["Label"];
    name: definitions["Name"];
    /** @enum {string} */
    type: "boolean" | "string" | "number";
    /**
     * @description This sets whether or not the feature can be customized by a consumer.
     * @default false
     */
    customizable?: boolean;
    /**
     * @description This sets whether or not the feature can be upgraded by the consumer after the
     * resource has provisioned. Upgrading means setting a higher value or selecting a
     * higher element in the list.
     *
     * @default false
     */
    upgradable?: boolean;
    /**
     * @description This sets whether or not the feature can be downgraded by the consumer after the
     * resource has provisioned. Downgrading means setting a lower value or selecting a
     * lower element in the list.
     *
     * @default false
     */
    downgradable?: boolean;
    /**
     * @description Sets if this feature’s value is trackable from the provider,
     * this only really affects numeric constraints.
     *
     * @default false
     */
    measurable?: boolean;
    values?: definitions["FeatureValuesList"];
  };
  /**
   * @description A list of allowable values for the feature.
   * To define values for a boolean feature type, only `true` is required,
   * using the label `true`, name and numeric_details will be ignored.
   * If the feature is set measurable it is expected that these all have a
   * `numeric_details` definition, and the plan will determine which
   * `numeric_details` set is used based on it's setting.
   */
  FeatureValuesList: definitions["FeatureValueDetails"][];
  FeatureValueDetails: {
    label: definitions["FeatureValueLabel"];
    name: definitions["Name"];
    /**
     * @description The cost that will be added to the monthly plan cost when this value
     * is selected or is default for the plan.
     * Cost is deprecated in favor of the `price.cost` field.
     *
     * @default 0
     */
    cost?: number;
    /**
     * @description Price describes the cost of a feature. It should be preferred over
     * the `cost` property.
     */
    price?: {
      /**
       * @description Cost is the price in cents that will be added to plan's base cost
       * when this value is selected or is default for the plan.
       * Number features should use the cost range instead.
       *
       * @default 0
       */
      cost?: number;
      /**
       * @description When a feature is used to multiply the cost of the plan or of
       * another feature, multiply factor is used for calculation.
       * A feature cannot have both a cost and a multiply factor.
       *
       * @default 0
       */
      multiply_factor?: number;
      /**
       * @description Price describes how the feature cost should be calculated.
       *
       * @example {
       *   "feature_multiplies_base_cost": "(* plan#base_cost feature-a#multiply_factor)",
       *   "feature_multiplies_feature_cost": "(* feature-b#cost feature-a#multiply_factor)",
       *   "feature_multiplies_numeric_value": "(* feature-c#number feature-a#multiply_factor)",
       *   "feature_multiplies_total_cost": "(* plan#total_cost feature-a#multiply_factor)",
       *   "feature_nested_formulas": "(+ (- (* feature-a#cost feature-b#multiply_factor) 500) plan#partial_cost)"
       * }
       */
      formula?: definitions["PriceFormula"];
      /** @description Description explains how a feature is calculated to the user. */
      description?: string;
    };
    numeric_details?: definitions["FeatureNumericDetails"];
  };
  /**
   * @description Optional container for additional details relating to numeric features.
   * This is required if the feature is measurable and numeric.
   */
  FeatureNumericDetails: {
    /**
     * @description Sets the increment at which numbers can be selected if customizable, by
     * default this is 1; for example, setting this to 8 would only allow integers
     * in increments of 8 ( 0, 8, 16, ... ). This property is not used if the
     * feature is measurable; except if it is set to 0, setting the increment to 0
     * means this numeric details has no scale, and will not be or customizable.
     * Some plans may not have a measureable or customizable feature.
     *
     * @default 1
     */
    increment?: number;
    /**
     * @description Minimum value that can be set by a user if customizable
     * @default 0
     */
    min?: number;
    /** @description Maximum value that can be set by a user if customizable */
    max?: number;
    /** @description Applied to the end of the number for display, for example the ‘GB’ in ‘20 GB’. */
    suffix?: string;
    cost_ranges?: definitions["FeatureNumericRange"][];
  };
  FeatureNumericRange: {
    /**
     * @description Defines the end of the range ( inclusive ), from the previous, or 0;
     * where the cost_multiple starts taking effect. If set to -1 this defines the
     * range to infinity, or the maximum integer the system can handle
     * ( whichever comes first ).
     */
    limit?: number;
    /**
     * @description An integer in 10,000,000ths of cents, will be multiplied by the
     * numeric value set in the feature to determine the cost.
     *
     * @default 0
     */
    cost_multiple?: number;
  };
  FeatureValue: {
    feature: definitions["Label"];
    value: definitions["FeatureValueLabel"];
  };
  ValueProp: {
    /** @description Heading of a value proposition. */
    header: string;
    /** @description Body of a value proposition. */
    body: string;
  };
  /**
   * Format: url
   * @description Image URL used for Product listings.
   *
   * Minimum 660px wide, 400px high.
   */
  ProductImageURL: string;
  /** @description List of tags for product categorization and search */
  ProductTags: definitions["Label"][];
  /** @enum {string} */
  ProductState: "available" | "hidden" | "grandfathered" | "new" | "upcoming";
  /** @default {} */
  ProductListing: {
    /**
     * @description When true, everyone can see the product when requested. When false it will
     * not be visible to anyone except those on the provider team.
     *
     * @default false
     */
    public?: boolean;
    /**
     * @description When true, the product will be displayed in product listings alongside
     * other products. When false the product will be excluded from listings,
     * but can still be provisioned directly if it's label is known.
     * Any pages that display information about the product when not listed,
     * should indicate to webcrawlers that the content should not be indexed.
     *
     * @default false
     */
    listed?: boolean;
    /**
     * @description Object to hold various flags for marketing purposes only. These are values
     * that need to be stored, but should not affect decision making in code. If
     * we find ourselves in a position where we think they should, we should
     * consider refactoring our listing definition.
     *
     * @default {}
     */
    marketing?: {
      /**
       * @description Indicates whether or not the product is in `Beta` and should be
       * advertised as such. This does not have any impact on who can access the
       * product, it is just used to inform consumers through our clients.
       *
       * @default false
       */
      beta?: boolean;
      /**
       * @description Indicates whether or not the product is in `New` and should be
       * advertised as such. This does not have any impact on who can access the
       * product, it is just used to inform consumers through our clients.
       *
       * @default false
       */
      new?: boolean;
      /**
       * @description Indicates whether or not the product is in `New` and should be
       * advertised as such. This does not have any impact on who can access the
       * product, it is just used to inform consumers through our clients.
       *
       * @default false
       */
      featured?: boolean;
    };
  };
  /**
   * @description Provider Only, implies that the product should only be provisionable by the
   *   provider; so members of the provider team, no one else should be allowed.
   * Pre-Order, should not be used yet. But in the future it should allow people to
   *   pre-provision a resource for when it does go live.
   * Public, means the resource is live and everyone should be able to provision it.
   *
   * @enum {string}
   */
  ProductProvisioning: "provider-only" | "pre-order" | "public";
  /** @default {} */
  ProductIntegrationFeatures: {
    /**
     * @description Indicates whether or not this product supports resource transitions to
     * manifold by access_code.
     */
    access_code?: boolean;
    /**
     * @description Represents whether or not this product supports Single
     * Sign On
     */
    sso?: boolean;
    /**
     * @description Represents whether or not this product supports changing
     * the plan of a resource.
     */
    plan_change?: boolean;
    /**
     * @description Describes how the region for a resource is specified, if
     * unspecified, then regions have no impact on this
     * resource.
     *
     * @enum {string}
     */
    region?: "user-specified" | "unspecified";
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
    credential?: "none" | "single" | "multiple" | "unknown";
  };
  ProductBody: {
    provider_id: definitions["ID"];
    /** @description Product labels are globally unique and contain the provider name. */
    label: definitions["Label"];
    name: definitions["Name"];
    state: definitions["ProductState"];
    listing: definitions["ProductListing"];
    logo_url: definitions["LogoURL"];
    /** @description 140 character sentence positioning the product. */
    tagline: string;
    /** @description A list of value propositions of the product. */
    value_props: definitions["ValueProp"][];
    /** @description A list of getting started steps for the product */
    setup_steps?: string[];
    images: definitions["ProductImageURL"][];
    /** Format: email */
    support_email: string;
    /** Format: url */
    documentation_url: string;
    /**
     * @description URL to this Product's Terms of Service. If provided is true, then
     * a url must be set. Otherwise, provided is false.
     */
    terms: {
      /** Format: url */
      url?: string;
      provided: boolean;
    };
    feature_types: definitions["FeatureType"][];
    billing: {
      /** @enum {string} */
      type: "monthly-prorated" | "monthly-anniversary" | "annual-anniversary";
      /** @enum {string} */
      currency: "usd";
    };
    integration: {
      provisioning: definitions["ProductProvisioning"];
      /** Format: url */
      base_url: string;
      /** Format: url */
      sso_url?: string;
      /** @enum {string} */
      version: "v1";
      features: definitions["ProductIntegrationFeatures"];
    };
    tags?: definitions["ProductTags"];
  };
  Product: {
    id: definitions["ID"];
    /** @enum {integer} */
    version: 1;
    /** @enum {string} */
    type: "product";
    body: definitions["ProductBody"];
  };
  CreateProduct: {
    body: definitions["ProductBody"];
  };
  /** @description Array of Plan IDs that this Plan can be resized to, if null all will be assumed */
  PlanResizeList: definitions["ID"][];
  PlanBody: {
    provider_id: definitions["ID"];
    product_id: definitions["ID"];
    name: definitions["Name"];
    label: definitions["Label"];
    state: definitions["PlanState"];
    resizable_to?: definitions["PlanResizeList"];
    /** @description Array of Region IDs */
    regions: definitions["ID"][];
    /** @description Array of Feature Values */
    features: definitions["FeatureValue"][];
    /**
     * @description The number of days a user gets as a free trial when subscribing to
     * this plan. Trials are valid only once per product; changing plans
     * or adding an additional subscription will not start a new trial.
     */
    trial_days?: number;
    /** @description Dollar value in cents. */
    cost: number;
  };
  /** @enum {string} */
  PlanState: "hidden" | "available" | "grandfathered" | "unlisted";
  ExpandedPlanBody: definitions["PlanBody"] & {
    /** @description An array of feature definitions for the plan, as defined on the Product. */
    expanded_features: definitions["ExpandedFeature"][];
    /** @description A boolean flag that indicates if a plan is free or not based on it's cost and features. */
    free: boolean;
    /** @description Plan cost using its default features plus base cost. */
    defaultCost?: number;
    /** @description A boolean flag that indicates if a plan has customizable features. */
    customizable?: boolean;
  };
  ExpandedFeature: definitions["FeatureType"] & {
    /** @description The string value set for the feature on the plan, this should only be used if the value property is null. */
    value_string: string;
    value: definitions["FeatureValueDetails"];
  };
  Plan: {
    id: definitions["ID"];
    /** @enum {integer} */
    version: 1;
    /** @enum {string} */
    type: "plan";
    body: definitions["PlanBody"];
  };
  ExpandedPlan: {
    id: definitions["ID"];
    /** @enum {integer} */
    version: 1;
    /** @enum {string} */
    type: "plan";
    body: definitions["ExpandedPlanBody"];
  };
  CreatePlan: {
    body: definitions["PlanBody"];
  };
  /** @description Unexpected error */
  Error: {
    /** @description The error type */
    type: string;
    /** @description Explanation of the errors */
    message: string[];
  };
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
  PriceFormula: string;
  ExpandedProduct: {
    id: definitions["ID"];
    /** @enum {integer} */
    version: 1;
    /** @enum {string} */
    type: "product";
    body: definitions["ProductBody"];
    plans?: definitions["ExpandedPlan"][];
    provider: definitions["Provider"];
  };
}

export interface parameters {
  /**
   * Format: label
   * @description Filter results to only include those that have this label.
   */
  LabelFilter: string;
}

export interface operations {}

export interface external {}
