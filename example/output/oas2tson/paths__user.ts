export const paths__user = {
  post: {
    tags: ["user"],
    summary: "Create user",
    description: "This can only be done by the logged in user.",
    operationId: "createUser",
    requestBody: {
      description: "Created user object",
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
      default: {
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
        links: {
          GetUserByUserId: {
            description:
              "The `username` value returned in the response can be used as the `username` parameter in `GET /users/{username}`.\n",
            operationId: "getUser",
            parameters: { userId: "$response.body#/username" },
            title: "GetUserByUserName",
            $id: "links_GetUserByUserName.json",
          },
        },
      },
      "4XX": { description: "error response" },
    },
    callbacks: {
      userCreated: {
        "https://notify.example.com?event=UserCreated": {
          post: {
            operationId: "notifyUserCreatedCB",
            summary: "notify on user create",
            requestBody: {
              description: "Callback payload",
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
              "200": { description: "Callback succeeded" },
              "4XX": { description: "Callback failed" },
            },
          },
        },
        title: "userCreatedCallback",
        $id: "callbacks_userCreatedCallback.json",
      },
    },
  },
  title: "/user",
  $id: "paths__user.json",
} as const;
