export const paths__store_inventory = {
  get: {
    tags: ["store"],
    summary: "Returns pet inventories by status",
    description: "Returns a map of status codes to quantities",
    operationId: "getInventory",
    responses: {
      "200": {
        description: "successful operation",
        content: {
          "application/json": {
            schema: {
              type: "object",
              additionalProperties: { type: "integer", format: "int32" },
            },
          },
        },
      },
      "4XX": { description: "error response" },
    },
    security: [{ api_key: [] }],
  },
  title: "/store/inventory",
  $id: "paths__store_inventory.json",
} as const;