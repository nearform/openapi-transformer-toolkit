export const paths__pet__petId__uploadImage = {
  post: {
    tags: ["pet"],
    summary: "uploads an image",
    description: "",
    operationId: "uploadFile",
    parameters: [
      {
        name: "petId",
        in: "path",
        description: "ID of pet to update",
        required: true,
        schema: { type: "integer", format: "int64" },
      },
      {
        name: "additionalMetadata",
        in: "query",
        description: "Additional Metadata",
        required: false,
        schema: { type: "string" },
      },
    ],
    requestBody: {
      content: {
        "application/octet-stream": {
          schema: { type: "string", format: "binary" },
        },
      },
    },
    responses: {
      "200": {
        description: "successful operation",
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                code: {
                  type: "integer",
                  format: "int32",
                  minimum: -2147483648,
                  maximum: 2147483647,
                },
                type: { type: "string" },
                message: { type: "string" },
              },
              title: "APIResponse",
              $id: "APIResponse.json",
            },
          },
        },
      },
      "4XX": { description: "error response" },
    },
    security: [{ petstore_auth: ["write:pets", "read:pets"] }],
  },
  title: "/pet/{petId}/uploadImage",
  $id: "paths__pet__petId__uploadImage.json",
} as const;
