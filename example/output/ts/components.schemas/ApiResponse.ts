export const ApiResponse = {
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
  title: "ApiResponse",
  $id: "ApiResponse.json",
} as const;
