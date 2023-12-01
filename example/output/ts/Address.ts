export const Address = {
  type: "object",
  properties: {
    street: { type: "string" },
    city: { type: "string" },
    state: { type: "string" },
    zip: { type: "string" },
  },
  title: "Address",
  $id: "Address.json",
} as const;
