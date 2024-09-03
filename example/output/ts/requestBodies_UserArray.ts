export const requestBodies_UserArray = {
  description: "List of user object",
  content: {
    "application/json": {
      schema: {
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
  title: "UserArray",
  $id: "requestBodies_UserArray.json",
} as const;
