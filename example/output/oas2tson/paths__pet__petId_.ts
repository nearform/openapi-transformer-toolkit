export const paths__pet__petId_ = {
  get: {
    tags: ["pet"],
    parameters: [
      {
        name: "petId",
        in: "path",
        description: "id of pet to use",
        required: true,
        schema: { type: "string" },
        title: "petIdPathParam",
        $id: "parameters_petIdPathParam.json",
      },
    ],
    summary: "Find pet by ID",
    description: "Returns a single pet",
    operationId: "getPetById",
    responses: {
      "200": {
        description: "successful operation",
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
      "400": { description: "Invalid ID supplied" },
      "404": { description: "Pet not found" },
    },
    security: [{ api_key: [] }, { petstore_auth: ["write:pets", "read:pets"] }],
  },
  post: {
    tags: ["pet"],
    summary: "Updates a pet in the store with form data",
    description: "",
    operationId: "updatePetWithForm",
    parameters: [
      {
        name: "petId",
        in: "path",
        description: "ID of pet that needs to be updated",
        required: true,
        schema: { type: "integer", format: "int64" },
      },
      {
        name: "name",
        in: "query",
        description: "Name of pet that needs to be updated",
        schema: { type: "string" },
      },
      {
        name: "status",
        in: "query",
        description: "Status of pet that needs to be updated",
        schema: { type: "string" },
      },
    ],
    responses: {
      "200": { description: "OK response" },
      "405": { description: "Invalid input" },
    },
    security: [{ petstore_auth: ["write:pets", "read:pets"] }],
  },
  delete: {
    tags: ["pet"],
    summary: "Deletes a pet",
    description: "delete a pet",
    operationId: "deletePet",
    parameters: [
      {
        name: "api_key",
        in: "header",
        description: "",
        required: false,
        schema: { type: "string" },
      },
      {
        name: "petId",
        in: "path",
        description: "Pet id to delete",
        required: true,
        schema: { type: "integer", format: "int64" },
      },
    ],
    responses: {
      "200": { description: "OK response" },
      "400": { description: "Invalid pet value" },
    },
    security: [{ petstore_auth: ["write:pets", "read:pets"] }],
  },
  title: "/pet/{petId}",
  $id: "paths__pet__petId_.json",
} as const;
