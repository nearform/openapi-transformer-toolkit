export const paths__pet_findByStatus = {
  get: {
    tags: ["pet"],
    summary: "Finds Pets by status",
    description:
      "Multiple status values can be provided with comma separated strings",
    operationId: "findPetsByStatus",
    parameters: [
      {
        name: "status",
        in: "query",
        description: "Status values that need to be considered for filter",
        required: false,
        explode: true,
        schema: {
          type: "string",
          default: "available",
          enum: ["available", "pending", "sold"],
        },
      },
    ],
    responses: {
      "200": {
        description: "successful operation",
        content: {
          "application/json": {
            schema: {
              type: "array",
              items: {
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
          "application/xml": {
            schema: {
              type: "array",
              items: {
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
      },
      "400": { description: "Invalid status value" },
    },
    security: [{ petstore_auth: ["write:pets", "read:pets"] }],
  },
  title: "/pet/findByStatus",
  $id: "paths__pet_findByStatus.json",
} as const;
