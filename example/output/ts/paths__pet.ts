export const paths__pet = {
  put: {
    tags: ["pet"],
    summary: "Update an existing pet",
    description: "Update an existing pet by Id",
    operationId: "updatePet",
    requestBody: {
      description: "Update an existent pet in the store",
      content: {
        "application/json": {
          schema: {
            required: ["name", "photoUrls"],
            type: "object",
            properties: {
              id: {
                type: "integer",
                format: "int64",
                minimum: -9223372036854776000,
                maximum: 9223372036854776000,
              },
              name: { type: "string" },
              category: {
                type: "object",
                properties: {
                  id: {
                    type: "integer",
                    format: "int64",
                    minimum: -9223372036854776000,
                    maximum: 9223372036854776000,
                  },
                  name: { type: "string" },
                },
                title: "Category",
                $id: "Category.json",
              },
              photoUrls: { type: "array", items: { type: "string" } },
              tags: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    id: {
                      type: "integer",
                      format: "int64",
                      minimum: -9223372036854776000,
                      maximum: 9223372036854776000,
                    },
                    name: { type: "string" },
                  },
                  title: "Tag",
                  $id: "Tag.json",
                },
              },
              status: {
                type: "string",
                description: "pet status in the store",
                enum: ["available", "pending", "sold"],
              },
              nullableValue: {
                oneOf: [{ type: "string" }, { type: "null" }],
                description:
                  'example nullable value\n\n\nOpenAPI 3.0 uses `nullable\n\n```yaml\ntype: string\nnullable: true\n```\n\nOpenAPI 3.1 removes `nullable` in favor or multi-typing.\n\n```yaml\ntype:\n- string\n- \'null\'\n```\n\nOR\n\n```yaml\noneOf:\n  - type: string\n  - type: null\n```\n\nBased on [this discussion](https://github.com/OAI/OpenAPI-Specification/issues/3148)\nit seems either is valid. But `openapi-schema-to-json-schema` throws because it claims \ntype `["string","null"]` is not a valid type, even though that\'s exactly what it \ngenerates for OpenAPI 3.0.x style. So, use `oneOf` to work around the issue.',
              },
            },
            title: "Pet",
            $id: "Pet.json",
          },
        },
        "application/xml": {
          schema: {
            required: ["name", "photoUrls"],
            type: "object",
            properties: {
              id: {
                type: "integer",
                format: "int64",
                minimum: -9223372036854776000,
                maximum: 9223372036854776000,
              },
              name: { type: "string" },
              category: {
                type: "object",
                properties: {
                  id: {
                    type: "integer",
                    format: "int64",
                    minimum: -9223372036854776000,
                    maximum: 9223372036854776000,
                  },
                  name: { type: "string" },
                },
                title: "Category",
                $id: "Category.json",
              },
              photoUrls: { type: "array", items: { type: "string" } },
              tags: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    id: {
                      type: "integer",
                      format: "int64",
                      minimum: -9223372036854776000,
                      maximum: 9223372036854776000,
                    },
                    name: { type: "string" },
                  },
                  title: "Tag",
                  $id: "Tag.json",
                },
              },
              status: {
                type: "string",
                description: "pet status in the store",
                enum: ["available", "pending", "sold"],
              },
              nullableValue: {
                oneOf: [{ type: "string" }, { type: "null" }],
                description:
                  'example nullable value\n\n\nOpenAPI 3.0 uses `nullable\n\n```yaml\ntype: string\nnullable: true\n```\n\nOpenAPI 3.1 removes `nullable` in favor or multi-typing.\n\n```yaml\ntype:\n- string\n- \'null\'\n```\n\nOR\n\n```yaml\noneOf:\n  - type: string\n  - type: null\n```\n\nBased on [this discussion](https://github.com/OAI/OpenAPI-Specification/issues/3148)\nit seems either is valid. But `openapi-schema-to-json-schema` throws because it claims \ntype `["string","null"]` is not a valid type, even though that\'s exactly what it \ngenerates for OpenAPI 3.0.x style. So, use `oneOf` to work around the issue.',
              },
            },
            title: "Pet",
            $id: "Pet.json",
          },
        },
        "application/x-www-form-urlencoded": {
          schema: {
            required: ["name", "photoUrls"],
            type: "object",
            properties: {
              id: {
                type: "integer",
                format: "int64",
                minimum: -9223372036854776000,
                maximum: 9223372036854776000,
              },
              name: { type: "string" },
              category: {
                type: "object",
                properties: {
                  id: {
                    type: "integer",
                    format: "int64",
                    minimum: -9223372036854776000,
                    maximum: 9223372036854776000,
                  },
                  name: { type: "string" },
                },
                title: "Category",
                $id: "Category.json",
              },
              photoUrls: { type: "array", items: { type: "string" } },
              tags: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    id: {
                      type: "integer",
                      format: "int64",
                      minimum: -9223372036854776000,
                      maximum: 9223372036854776000,
                    },
                    name: { type: "string" },
                  },
                  title: "Tag",
                  $id: "Tag.json",
                },
              },
              status: {
                type: "string",
                description: "pet status in the store",
                enum: ["available", "pending", "sold"],
              },
              nullableValue: {
                oneOf: [{ type: "string" }, { type: "null" }],
                description:
                  'example nullable value\n\n\nOpenAPI 3.0 uses `nullable\n\n```yaml\ntype: string\nnullable: true\n```\n\nOpenAPI 3.1 removes `nullable` in favor or multi-typing.\n\n```yaml\ntype:\n- string\n- \'null\'\n```\n\nOR\n\n```yaml\noneOf:\n  - type: string\n  - type: null\n```\n\nBased on [this discussion](https://github.com/OAI/OpenAPI-Specification/issues/3148)\nit seems either is valid. But `openapi-schema-to-json-schema` throws because it claims \ntype `["string","null"]` is not a valid type, even though that\'s exactly what it \ngenerates for OpenAPI 3.0.x style. So, use `oneOf` to work around the issue.',
              },
            },
            title: "Pet",
            $id: "Pet.json",
          },
        },
      },
      required: true,
    },
    responses: {
      "200": {
        description: "Successful operation",
        content: {
          "application/json": {
            schema: {
              required: ["name", "photoUrls"],
              type: "object",
              properties: {
                id: {
                  type: "integer",
                  format: "int64",
                  minimum: -9223372036854776000,
                  maximum: 9223372036854776000,
                },
                name: { type: "string" },
                category: {
                  type: "object",
                  properties: {
                    id: {
                      type: "integer",
                      format: "int64",
                      minimum: -9223372036854776000,
                      maximum: 9223372036854776000,
                    },
                    name: { type: "string" },
                  },
                  title: "Category",
                  $id: "Category.json",
                },
                photoUrls: { type: "array", items: { type: "string" } },
                tags: {
                  type: "array",
                  items: {
                    type: "object",
                    properties: {
                      id: {
                        type: "integer",
                        format: "int64",
                        minimum: -9223372036854776000,
                        maximum: 9223372036854776000,
                      },
                      name: { type: "string" },
                    },
                    title: "Tag",
                    $id: "Tag.json",
                  },
                },
                status: {
                  type: "string",
                  description: "pet status in the store",
                  enum: ["available", "pending", "sold"],
                },
                nullableValue: {
                  oneOf: [{ type: "string" }, { type: "null" }],
                  description:
                    'example nullable value\n\n\nOpenAPI 3.0 uses `nullable\n\n```yaml\ntype: string\nnullable: true\n```\n\nOpenAPI 3.1 removes `nullable` in favor or multi-typing.\n\n```yaml\ntype:\n- string\n- \'null\'\n```\n\nOR\n\n```yaml\noneOf:\n  - type: string\n  - type: null\n```\n\nBased on [this discussion](https://github.com/OAI/OpenAPI-Specification/issues/3148)\nit seems either is valid. But `openapi-schema-to-json-schema` throws because it claims \ntype `["string","null"]` is not a valid type, even though that\'s exactly what it \ngenerates for OpenAPI 3.0.x style. So, use `oneOf` to work around the issue.',
                },
              },
              title: "Pet",
              $id: "Pet.json",
            },
            examples: {
              petExample: {
                value: {
                  id: 1,
                  name: "Rover",
                  photoUrls: [
                    "https://http.cat/status/200",
                    "https://http.cat/status/203",
                  ],
                },
                summary: "A sample Pet",
                title: "petExample",
                $id: "examples_petExample.json",
              },
            },
          },
          "application/xml": {
            schema: {
              required: ["name", "photoUrls"],
              type: "object",
              properties: {
                id: {
                  type: "integer",
                  format: "int64",
                  minimum: -9223372036854776000,
                  maximum: 9223372036854776000,
                },
                name: { type: "string" },
                category: {
                  type: "object",
                  properties: {
                    id: {
                      type: "integer",
                      format: "int64",
                      minimum: -9223372036854776000,
                      maximum: 9223372036854776000,
                    },
                    name: { type: "string" },
                  },
                  title: "Category",
                  $id: "Category.json",
                },
                photoUrls: { type: "array", items: { type: "string" } },
                tags: {
                  type: "array",
                  items: {
                    type: "object",
                    properties: {
                      id: {
                        type: "integer",
                        format: "int64",
                        minimum: -9223372036854776000,
                        maximum: 9223372036854776000,
                      },
                      name: { type: "string" },
                    },
                    title: "Tag",
                    $id: "Tag.json",
                  },
                },
                status: {
                  type: "string",
                  description: "pet status in the store",
                  enum: ["available", "pending", "sold"],
                },
                nullableValue: {
                  oneOf: [{ type: "string" }, { type: "null" }],
                  description:
                    'example nullable value\n\n\nOpenAPI 3.0 uses `nullable\n\n```yaml\ntype: string\nnullable: true\n```\n\nOpenAPI 3.1 removes `nullable` in favor or multi-typing.\n\n```yaml\ntype:\n- string\n- \'null\'\n```\n\nOR\n\n```yaml\noneOf:\n  - type: string\n  - type: null\n```\n\nBased on [this discussion](https://github.com/OAI/OpenAPI-Specification/issues/3148)\nit seems either is valid. But `openapi-schema-to-json-schema` throws because it claims \ntype `["string","null"]` is not a valid type, even though that\'s exactly what it \ngenerates for OpenAPI 3.0.x style. So, use `oneOf` to work around the issue.',
                },
              },
              title: "Pet",
              $id: "Pet.json",
            },
          },
        },
      },
      "400": { description: "Invalid ID supplied" },
      "404": { description: "Pet not found" },
      "405": { description: "Validation exception" },
    },
    security: [{ petstore_auth: ["write:pets", "read:pets"] }],
  },
  post: {
    tags: ["pet"],
    summary: "Add a new pet to the store",
    description: "Add a new pet to the store",
    operationId: "addPet",
    requestBody: {
      description: "Create a new pet in the store",
      required: true,
      content: {
        "application/json": {
          schema: {
            required: ["name", "photoUrls"],
            type: "object",
            properties: {
              id: {
                type: "integer",
                format: "int64",
                minimum: -9223372036854776000,
                maximum: 9223372036854776000,
              },
              name: { type: "string" },
              category: {
                type: "object",
                properties: {
                  id: {
                    type: "integer",
                    format: "int64",
                    minimum: -9223372036854776000,
                    maximum: 9223372036854776000,
                  },
                  name: { type: "string" },
                },
                title: "Category",
                $id: "Category.json",
              },
              photoUrls: { type: "array", items: { type: "string" } },
              tags: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    id: {
                      type: "integer",
                      format: "int64",
                      minimum: -9223372036854776000,
                      maximum: 9223372036854776000,
                    },
                    name: { type: "string" },
                  },
                  title: "Tag",
                  $id: "Tag.json",
                },
              },
              status: {
                type: "string",
                description: "pet status in the store",
                enum: ["available", "pending", "sold"],
              },
              nullableValue: {
                oneOf: [{ type: "string" }, { type: "null" }],
                description:
                  'example nullable value\n\n\nOpenAPI 3.0 uses `nullable\n\n```yaml\ntype: string\nnullable: true\n```\n\nOpenAPI 3.1 removes `nullable` in favor or multi-typing.\n\n```yaml\ntype:\n- string\n- \'null\'\n```\n\nOR\n\n```yaml\noneOf:\n  - type: string\n  - type: null\n```\n\nBased on [this discussion](https://github.com/OAI/OpenAPI-Specification/issues/3148)\nit seems either is valid. But `openapi-schema-to-json-schema` throws because it claims \ntype `["string","null"]` is not a valid type, even though that\'s exactly what it \ngenerates for OpenAPI 3.0.x style. So, use `oneOf` to work around the issue.',
              },
            },
            title: "Pet",
            $id: "Pet.json",
          },
        },
        "application/xml": {
          schema: {
            required: ["name", "photoUrls"],
            type: "object",
            properties: {
              id: {
                type: "integer",
                format: "int64",
                minimum: -9223372036854776000,
                maximum: 9223372036854776000,
              },
              name: { type: "string" },
              category: {
                type: "object",
                properties: {
                  id: {
                    type: "integer",
                    format: "int64",
                    minimum: -9223372036854776000,
                    maximum: 9223372036854776000,
                  },
                  name: { type: "string" },
                },
                title: "Category",
                $id: "Category.json",
              },
              photoUrls: { type: "array", items: { type: "string" } },
              tags: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    id: {
                      type: "integer",
                      format: "int64",
                      minimum: -9223372036854776000,
                      maximum: 9223372036854776000,
                    },
                    name: { type: "string" },
                  },
                  title: "Tag",
                  $id: "Tag.json",
                },
              },
              status: {
                type: "string",
                description: "pet status in the store",
                enum: ["available", "pending", "sold"],
              },
              nullableValue: {
                oneOf: [{ type: "string" }, { type: "null" }],
                description:
                  'example nullable value\n\n\nOpenAPI 3.0 uses `nullable\n\n```yaml\ntype: string\nnullable: true\n```\n\nOpenAPI 3.1 removes `nullable` in favor or multi-typing.\n\n```yaml\ntype:\n- string\n- \'null\'\n```\n\nOR\n\n```yaml\noneOf:\n  - type: string\n  - type: null\n```\n\nBased on [this discussion](https://github.com/OAI/OpenAPI-Specification/issues/3148)\nit seems either is valid. But `openapi-schema-to-json-schema` throws because it claims \ntype `["string","null"]` is not a valid type, even though that\'s exactly what it \ngenerates for OpenAPI 3.0.x style. So, use `oneOf` to work around the issue.',
              },
            },
            title: "Pet",
            $id: "Pet.json",
          },
        },
        "application/x-www-form-urlencoded": {
          schema: {
            required: ["name", "photoUrls"],
            type: "object",
            properties: {
              id: {
                type: "integer",
                format: "int64",
                minimum: -9223372036854776000,
                maximum: 9223372036854776000,
              },
              name: { type: "string" },
              category: {
                type: "object",
                properties: {
                  id: {
                    type: "integer",
                    format: "int64",
                    minimum: -9223372036854776000,
                    maximum: 9223372036854776000,
                  },
                  name: { type: "string" },
                },
                title: "Category",
                $id: "Category.json",
              },
              photoUrls: { type: "array", items: { type: "string" } },
              tags: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    id: {
                      type: "integer",
                      format: "int64",
                      minimum: -9223372036854776000,
                      maximum: 9223372036854776000,
                    },
                    name: { type: "string" },
                  },
                  title: "Tag",
                  $id: "Tag.json",
                },
              },
              status: {
                type: "string",
                description: "pet status in the store",
                enum: ["available", "pending", "sold"],
              },
              nullableValue: {
                oneOf: [{ type: "string" }, { type: "null" }],
                description:
                  'example nullable value\n\n\nOpenAPI 3.0 uses `nullable\n\n```yaml\ntype: string\nnullable: true\n```\n\nOpenAPI 3.1 removes `nullable` in favor or multi-typing.\n\n```yaml\ntype:\n- string\n- \'null\'\n```\n\nOR\n\n```yaml\noneOf:\n  - type: string\n  - type: null\n```\n\nBased on [this discussion](https://github.com/OAI/OpenAPI-Specification/issues/3148)\nit seems either is valid. But `openapi-schema-to-json-schema` throws because it claims \ntype `["string","null"]` is not a valid type, even though that\'s exactly what it \ngenerates for OpenAPI 3.0.x style. So, use `oneOf` to work around the issue.',
              },
            },
            title: "Pet",
            $id: "Pet.json",
          },
        },
      },
      title: "PetJSON-XML-Form",
      $id: "requestBodies_PetJSON_XML_Form.json",
    },
    responses: {
      "200": {
        description: "Successful operation",
        content: {
          "application/json": {
            schema: {
              required: ["name", "photoUrls"],
              type: "object",
              properties: {
                id: {
                  type: "integer",
                  format: "int64",
                  minimum: -9223372036854776000,
                  maximum: 9223372036854776000,
                },
                name: { type: "string" },
                category: {
                  type: "object",
                  properties: {
                    id: {
                      type: "integer",
                      format: "int64",
                      minimum: -9223372036854776000,
                      maximum: 9223372036854776000,
                    },
                    name: { type: "string" },
                  },
                  title: "Category",
                  $id: "Category.json",
                },
                photoUrls: { type: "array", items: { type: "string" } },
                tags: {
                  type: "array",
                  items: {
                    type: "object",
                    properties: {
                      id: {
                        type: "integer",
                        format: "int64",
                        minimum: -9223372036854776000,
                        maximum: 9223372036854776000,
                      },
                      name: { type: "string" },
                    },
                    title: "Tag",
                    $id: "Tag.json",
                  },
                },
                status: {
                  type: "string",
                  description: "pet status in the store",
                  enum: ["available", "pending", "sold"],
                },
                nullableValue: {
                  oneOf: [{ type: "string" }, { type: "null" }],
                  description:
                    'example nullable value\n\n\nOpenAPI 3.0 uses `nullable\n\n```yaml\ntype: string\nnullable: true\n```\n\nOpenAPI 3.1 removes `nullable` in favor or multi-typing.\n\n```yaml\ntype:\n- string\n- \'null\'\n```\n\nOR\n\n```yaml\noneOf:\n  - type: string\n  - type: null\n```\n\nBased on [this discussion](https://github.com/OAI/OpenAPI-Specification/issues/3148)\nit seems either is valid. But `openapi-schema-to-json-schema` throws because it claims \ntype `["string","null"]` is not a valid type, even though that\'s exactly what it \ngenerates for OpenAPI 3.0.x style. So, use `oneOf` to work around the issue.',
                },
              },
              title: "Pet",
              $id: "Pet.json",
            },
          },
          "application/xml": {
            schema: {
              required: ["name", "photoUrls"],
              type: "object",
              properties: {
                id: {
                  type: "integer",
                  format: "int64",
                  minimum: -9223372036854776000,
                  maximum: 9223372036854776000,
                },
                name: { type: "string" },
                category: {
                  type: "object",
                  properties: {
                    id: {
                      type: "integer",
                      format: "int64",
                      minimum: -9223372036854776000,
                      maximum: 9223372036854776000,
                    },
                    name: { type: "string" },
                  },
                  title: "Category",
                  $id: "Category.json",
                },
                photoUrls: { type: "array", items: { type: "string" } },
                tags: {
                  type: "array",
                  items: {
                    type: "object",
                    properties: {
                      id: {
                        type: "integer",
                        format: "int64",
                        minimum: -9223372036854776000,
                        maximum: 9223372036854776000,
                      },
                      name: { type: "string" },
                    },
                    title: "Tag",
                    $id: "Tag.json",
                  },
                },
                status: {
                  type: "string",
                  description: "pet status in the store",
                  enum: ["available", "pending", "sold"],
                },
                nullableValue: {
                  oneOf: [{ type: "string" }, { type: "null" }],
                  description:
                    'example nullable value\n\n\nOpenAPI 3.0 uses `nullable\n\n```yaml\ntype: string\nnullable: true\n```\n\nOpenAPI 3.1 removes `nullable` in favor or multi-typing.\n\n```yaml\ntype:\n- string\n- \'null\'\n```\n\nOR\n\n```yaml\noneOf:\n  - type: string\n  - type: null\n```\n\nBased on [this discussion](https://github.com/OAI/OpenAPI-Specification/issues/3148)\nit seems either is valid. But `openapi-schema-to-json-schema` throws because it claims \ntype `["string","null"]` is not a valid type, even though that\'s exactly what it \ngenerates for OpenAPI 3.0.x style. So, use `oneOf` to work around the issue.',
                },
              },
              title: "Pet",
              $id: "Pet.json",
            },
          },
        },
      },
      "405": {
        description: "Illegal input for operation.",
        title: "IllegalInput",
        $id: "responses_IllegalInput.json",
      },
    },
    security: [{ petstore_auth: ["write:pets", "read:pets"] }],
  },
  title: "/pet",
  $id: "paths__pet.json",
} as const;
