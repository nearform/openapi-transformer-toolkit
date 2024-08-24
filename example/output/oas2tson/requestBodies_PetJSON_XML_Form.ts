export const requestBodies_PetJSON_XML_Form = {
  description: "Pet object that needs to be added to the store",
  content: {
    "application/json": {
      schema: {
        required: ["name", "photoUrls"],
        type: "object",
        properties: {
          id: {
            type: "integer",
            format: "int64",
            minimum: -9223372036854776000,
            maximum: 9223372036854776000,
          },
          name: { type: "string" },
          category: {
            type: "object",
            properties: {
              id: {
                type: "integer",
                format: "int64",
                minimum: -9223372036854776000,
                maximum: 9223372036854776000,
              },
              name: { type: "string" },
            },
            title: "Category",
            $id: "Category.json",
          },
          photoUrls: { type: "array", items: { type: "string" } },
          tags: {
            type: "array",
            items: {
              type: "object",
              properties: {
                id: {
                  type: "integer",
                  format: "int64",
                  minimum: -9223372036854776000,
                  maximum: 9223372036854776000,
                },
                name: { type: "string" },
              },
              title: "Tag",
              $id: "Tag.json",
            },
          },
          status: {
            type: "string",
            description: "pet status in the store",
            enum: ["available", "pending", "sold"],
          },
          nullableValue: {
            type: ["string", "null"],
            description: "example nullable value",
          },
        },
        title: "Pet",
        $id: "Pet.json",
      },
    },
    "application/xml": {
      schema: {
        required: ["name", "photoUrls"],
        type: "object",
        properties: {
          id: {
            type: "integer",
            format: "int64",
            minimum: -9223372036854776000,
            maximum: 9223372036854776000,
          },
          name: { type: "string" },
          category: {
            type: "object",
            properties: {
              id: {
                type: "integer",
                format: "int64",
                minimum: -9223372036854776000,
                maximum: 9223372036854776000,
              },
              name: { type: "string" },
            },
            title: "Category",
            $id: "Category.json",
          },
          photoUrls: { type: "array", items: { type: "string" } },
          tags: {
            type: "array",
            items: {
              type: "object",
              properties: {
                id: {
                  type: "integer",
                  format: "int64",
                  minimum: -9223372036854776000,
                  maximum: 9223372036854776000,
                },
                name: { type: "string" },
              },
              title: "Tag",
              $id: "Tag.json",
            },
          },
          status: {
            type: "string",
            description: "pet status in the store",
            enum: ["available", "pending", "sold"],
          },
          nullableValue: {
            type: ["string", "null"],
            description: "example nullable value",
          },
        },
        title: "Pet",
        $id: "Pet.json",
      },
    },
    "application/x-www-form-urlencoded": {
      schema: {
        required: ["name", "photoUrls"],
        type: "object",
        properties: {
          id: {
            type: "integer",
            format: "int64",
            minimum: -9223372036854776000,
            maximum: 9223372036854776000,
          },
          name: { type: "string" },
          category: {
            type: "object",
            properties: {
              id: {
                type: "integer",
                format: "int64",
                minimum: -9223372036854776000,
                maximum: 9223372036854776000,
              },
              name: { type: "string" },
            },
            title: "Category",
            $id: "Category.json",
          },
          photoUrls: { type: "array", items: { type: "string" } },
          tags: {
            type: "array",
            items: {
              type: "object",
              properties: {
                id: {
                  type: "integer",
                  format: "int64",
                  minimum: -9223372036854776000,
                  maximum: 9223372036854776000,
                },
                name: { type: "string" },
              },
              title: "Tag",
              $id: "Tag.json",
            },
          },
          status: {
            type: "string",
            description: "pet status in the store",
            enum: ["available", "pending", "sold"],
          },
          nullableValue: {
            type: ["string", "null"],
            description: "example nullable value",
          },
        },
        title: "Pet",
        $id: "Pet.json",
      },
    },
  },
  title: "PetJSON-XML-Form",
  $id: "requestBodies_PetJSON_XML_Form.json",
} as const;
