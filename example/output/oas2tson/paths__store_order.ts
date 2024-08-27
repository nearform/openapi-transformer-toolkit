export const paths__store_order = {
  post: {
    tags: ["store"],
    summary: "Place an order for a pet",
    description: "Place a new order in the store",
    operationId: "placeOrder",
    requestBody: {
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
                // tsType: "Date",
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
                  // tsType: "Date",
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
      "405": { description: "Invalid input" },
    },
  },
  title: "/store/order",
  $id: "paths__store_order.json",
} as const;
