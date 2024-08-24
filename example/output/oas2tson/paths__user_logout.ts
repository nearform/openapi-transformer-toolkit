export const paths__user_logout = {
  get: {
    tags: ["user"],
    summary: "Logs out current logged in user session",
    description: "",
    operationId: "logoutUser",
    parameters: [],
    responses: {
      default: { description: "successful operation" },
      "4XX": { description: "error response" },
    },
  },
  title: "/user/logout",
  $id: "paths__user_logout.json",
} as const;
