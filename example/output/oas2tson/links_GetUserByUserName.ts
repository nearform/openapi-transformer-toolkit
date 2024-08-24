export const links_GetUserByUserName = {
  description:
    "The `username` value returned in the response can be used as the `username` parameter in `GET /users/{username}`.\n",
  operationId: "getUser",
  parameters: { userId: "$response.body#/username" },
  title: "GetUserByUserName",
  $id: "links_GetUserByUserName.json",
} as const;
