export const webhooks_userCreated = {
  post: {
    operationId: "userCreatedWH",
    summary: "notify on user create",
    requestBody: {
      description: "webhook payload",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              id: {
                type: "integer",
                format: "int64",
                minimum: -9223372036854776000,
                maximum: 9223372036854776000,
              },
              username: { type: "string" },
              firstName: { type: "string" },
              lastName: { type: "string" },
              email: { type: "string" },
              password: { type: "string" },
              phone: { type: "string" },
              userStatus: {
                type: "integer",
                description: "User Status",
                format: "int32",
                minimum: -2147483648,
                maximum: 2147483647,
              },
            },
            title: "User",
            $id: "User.json",
          },
        },
      },
    },
    responses: {
      "200": { description: "OK response" },
      "4XX": { description: "Error response" },
    },
  },
  title: "userCreated",
  $id: "webhooks_userCreated.json",
} as const;
