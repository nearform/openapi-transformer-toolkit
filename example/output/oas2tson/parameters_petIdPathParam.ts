export const parameters_petIdPathParam = {
  name: "petId",
  in: "path",
  description: "id of pet to use",
  required: true,
  schema: { type: "string" },
  title: "petIdPathParam",
  $id: "parameters_petIdPathParam.json",
} as const;
