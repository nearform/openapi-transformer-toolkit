export const paths__pet_findByTags = {
  get: {
    tags: ["pet"],
    summary: "Finds Pets by tags",
    description:
      "Multiple tags can be provided with comma separated strings. Use tag1, tag2, tag3 for testing.",
    operationId: "findPetsByTags",
    parameters: [
      {
        name: "tags",
        in: "query",
        description: "Tags to filter by",
        required: false,
        explode: true,
        schema: { type: "array", items: { type: "string" } },
        title: "tagsQueryParam",
        $id: "parameters_tagsQueryParam.json",
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
      "400": { description: "Invalid tag value" },
    },
    security: [{ petstore_auth: ["write:pets", "read:pets"] }],
  },
  title: "/pet/findByTags",
  $id: "paths__pet_findByTags.json",
} as const;
