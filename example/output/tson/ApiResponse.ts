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
    FooBARBaz: {
      type: "string",
      description:
        "this name is valid and should be FooBARBaz everywhere it appears",
      title: "FooBARBaz",
      $id: "FooBARBaz.json",
    },
  },
  title: "ApiResponse",
  $id: "ApiResponse.json",
} as const;
