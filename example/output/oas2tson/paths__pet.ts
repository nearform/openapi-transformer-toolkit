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
                type: ["string", "null"],
                description: "example nullable value",
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
                type: ["string", "null"],
                description: "example nullable value",
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
                type: ["string", "null"],
                description: "example nullable value",
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
                  type: ["string", "null"],
                  description: "example nullable value",
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
                  type: ["string", "null"],
                  description: "example nullable value",
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
                type: ["string", "null"],
                description: "example nullable value",
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
                type: ["string", "null"],
                description: "example nullable value",
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
                type: ["string", "null"],
                description: "example nullable value",
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
                  type: ["string", "null"],
                  description: "example nullable value",
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
                  type: ["string", "null"],
                  description: "example nullable value",
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
