export const paths__user_login = {
  get: {
    tags: ["user"],
    summary: "Logs user into the system",
    description: "",
    operationId: "loginUser",
    parameters: [
      {
        name: "username",
        in: "query",
        description: "The user name for login",
        required: false,
        schema: { type: "string" },
      },
      {
        name: "password",
        in: "query",
        description: "The password for login in clear text",
        required: false,
        schema: { type: "string" },
      },
    ],
    responses: {
      "200": {
        description: "successful operation",
        headers: {
          "X-Rate-Limit": {
            description: "calls per hour allowed by the user",
            schema: { type: "integer", format: "int32" },
            title: "X-Rate-Limit",
            $id: "headers_X_Rate_Limit.json",
          },
          "X-Expires-After": {
            description: "date in UTC when token expires",
            schema: { type: "string", format: "date-time" },
            title: "X-Expires-After",
            $id: "headers_X_Expires_After.json",
          },
        },
        content: {
          "application/xml": { schema: { type: "string" } },
          "application/json": { schema: { type: "string" } },
        },
      },
      "400": { description: "Invalid username/password supplied" },
    },
  },
  title: "/user/login",
  $id: "paths__user_login.json",
} as const;
