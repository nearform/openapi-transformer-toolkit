export const paths__user__username_ = {
  get: {
    tags: ["user"],
    summary: "Get user by user name",
    description: "",
    operationId: "getUserByName",
    parameters: [
      {
        name: "username",
        in: "path",
        description:
          "The name that needs to be fetched. Use user1 for testing. ",
        required: true,
        schema: { type: "string" },
      },
    ],
    responses: {
      "200": {
        description: "successful operation",
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
          "application/xml": {
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
      "400": { description: "Invalid username supplied" },
      "404": {
        description: "Entity not found.",
        title: "NotFound",
        $id: "responses_NotFound.json",
      },
    },
  },
  put: {
    tags: ["user"],
    summary: "Update user",
    description: "This can only be done by the logged in user.",
    operationId: "updateUser",
    parameters: [
      {
        name: "username",
        in: "path",
        description: "name that need to be deleted",
        required: true,
        schema: { type: "string" },
      },
    ],
    requestBody: {
      description: "Update an existent user in the store",
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
        "application/xml": {
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
        "application/x-www-form-urlencoded": {
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
      default: { description: "successful operation" },
      "4XX": { description: "error response" },
    },
  },
  delete: {
    tags: ["user"],
    summary: "Delete user",
    description: "This can only be done by the logged in user.",
    operationId: "deleteUser",
    parameters: [
      {
        name: "username",
        in: "path",
        description: "The name that needs to be deleted",
        required: true,
        schema: { type: "string" },
      },
    ],
    responses: {
      "200": { description: "OK response" },
      "400": { description: "Invalid username supplied" },
      "404": { description: "User not found" },
    },
  },
  title: "/user/{username}",
  $id: "paths__user__username_.json",
} as const;
