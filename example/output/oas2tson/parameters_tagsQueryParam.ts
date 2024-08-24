export const parameters_tagsQueryParam = {
  name: "tags",
  in: "query",
  description: "Tags to filter by",
  required: false,
  explode: true,
  schema: { type: "array", items: { type: "string" } },
  title: "tagsQueryParam",
  $id: "parameters_tagsQueryParam.json",
} as const;
