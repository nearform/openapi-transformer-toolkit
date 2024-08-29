export const Order = {
  type: "object",
  properties: {
    id: {
      type: "integer",
      format: "int64",
      minimum: -9223372036854776000,
      maximum: 9223372036854776000,
    },
    petId: {
      type: "integer",
      format: "int64",
      minimum: -9223372036854776000,
      maximum: 9223372036854776000,
    },
    quantity: {
      type: "integer",
      format: "int32",
      minimum: -2147483648,
      maximum: 2147483647,
    },
    shipDate: {
      type: "string",
      format: "date-time",
      title: "ShipDate",
      $id: "ShipDate.json",
    },
    status: {
      type: "string",
      description: "Order Status",
      enum: ["placed", "approved", "delivered"],
    },
    complete: { type: "boolean" },
  },
  title: "Order",
  $id: "Order.json",
} as const;
