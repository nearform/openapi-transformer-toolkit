export const paths__store_order__orderId_ = {
  get: {
    tags: ["store"],
    summary: "Find purchase order by ID",
    description:
      "For valid response try integer IDs with value <= 5 or > 10. Other values will generate exceptions.",
    operationId: "getOrderById",
    parameters: [
      {
        name: "orderId",
        in: "path",
        description: "ID of order that needs to be fetched",
        required: true,
        schema: { type: "integer", format: "int64" },
      },
    ],
    responses: {
      "200": {
        description: "successful operation",
        content: {
          "application/json": {
            schema: {
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
                  tsType: "Date",
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
            },
          },
          "application/xml": {
            schema: {
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
                  tsType: "Date",
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
            },
          },
        },
      },
      "400": { description: "Invalid ID supplied" },
      "404": { description: "Order not found" },
    },
  },
  delete: {
    tags: ["store"],
    summary: "Delete purchase order by ID",
    description:
      "For valid response try integer IDs with value < 1000. Anything above 1000 or nonintegers will generate API errors",
    operationId: "deleteOrder",
    parameters: [
      {
        name: "orderId",
        in: "path",
        description: "ID of the order that needs to be deleted",
        required: true,
        schema: { type: "integer", format: "int64" },
      },
    ],
    responses: {
      "200": { description: "OK response" },
      "400": { description: "Invalid ID supplied" },
      "404": { description: "Order not found" },
    },
  },
  title: "/store/order/{orderId}",
  $id: "paths__store_order__orderId_.json",
} as const;
