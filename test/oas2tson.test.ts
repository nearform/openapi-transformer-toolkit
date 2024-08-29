import fs from 'fs-extra'
import tap from 'tap'
import { runCommand } from '../src/commands/oas2tson.js'
import { resolveFromPackageRoot } from '../src/utils/paths.js'

const TEST_DIRECTORY = resolveFromPackageRoot('test', 'temp')

const inputPath = './test/fixtures/openapi.yml'
const outputPath = './test/temp/typescriptobj-from-oas/ts'

tap.test('oas2tson', async t => {
  t.test('runCommand function', async t => {
    fs.ensureDirSync(TEST_DIRECTORY)

    await runCommand(inputPath, outputPath)

    const generatedFiles = fs.readdirSync(outputPath)

    t.match(
      generatedFiles,
      [
        'Address.ts',
        'ApiResponse.ts',
        'Category.ts',
        'Customer.ts',
        'FooBARBaz.ts',
        'Order.ts',
        'Pet.ts',
        'Tag.ts',
        'User.ts'
      ],
      'generates the expected TS files'
    )

    const PetFile = resolveFromPackageRoot(outputPath, 'Pet.ts')
    const generatedPetFile = fs.readFileSync(PetFile, 'utf-8')

    t.same(
      generatedPetFile,
      `export const Pet = {
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
} as const;
`,
      'Pet.ts is created correctly'
    )

    const CustomerFile = resolveFromPackageRoot(outputPath, 'Customer.ts')
    const generatedCustomerFile = fs.readFileSync(CustomerFile, 'utf-8')

    t.same(
      generatedCustomerFile,
      `export const Customer = {
  type: "object",
  properties: {
    id: {
      type: "integer",
      format: "int64",
      minimum: -9223372036854776000,
      maximum: 9223372036854776000,
    },
    username: { type: "string" },
    address: {
      type: "array",
      items: {
        type: "object",
        properties: {
          street: { type: "string" },
          city: { type: "string" },
          state: { type: "string" },
          zip: { type: "string" },
        },
        title: "Address",
        $id: "Address.json",
      },
    },
  },
  title: "Customer",
  $id: "Customer.json",
} as const;
`,
      'Customer.ts is created correctly'
    )
  })

  t.test('runCommand function with excludeDereferencedIds', async t => {
    fs.ensureDirSync(TEST_DIRECTORY)

    await runCommand(inputPath, outputPath, undefined, true)

    const generatedFiles = fs.readdirSync(outputPath)

    t.match(
      generatedFiles,
      [
        'Address.ts',
        'ApiResponse.ts',
        'Category.ts',
        'Customer.ts',
        'FooBARBaz.ts',
        'Order.ts',
        'Pet.ts',
        'Tag.ts',
        'User.ts'
      ],
      'generates the expected TS files'
    )

    const PetFile = resolveFromPackageRoot(outputPath, 'Pet.ts')
    const generatedPetFile = fs.readFileSync(PetFile, 'utf-8')

    t.same(
      generatedPetFile,
      `export const Pet = {
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
} as const;
`,
      'Pet.ts is created correctly'
    )

    const CustomerFile = resolveFromPackageRoot(outputPath, 'Customer.ts')
    const generatedCustomerFile = fs.readFileSync(CustomerFile, 'utf-8')

    t.same(
      generatedCustomerFile,
      `export const Customer = {
  type: "object",
  properties: {
    id: {
      type: "integer",
      format: "int64",
      minimum: -9223372036854776000,
      maximum: 9223372036854776000,
    },
    username: { type: "string" },
    address: {
      type: "array",
      items: {
        type: "object",
        properties: {
          street: { type: "string" },
          city: { type: "string" },
          state: { type: "string" },
          zip: { type: "string" },
        },
        title: "Address",
      },
    },
  },
  title: "Customer",
  $id: "Customer.json",
} as const;
`,
      'Customer.ts is created correctly'
    )
  })

  t.test('runCommand function with --path', async t => {
    fs.ensureDirSync(TEST_DIRECTORY)

    await runCommand(inputPath, outputPath, 'paths', true)

    const generatedFiles = fs.readdirSync(outputPath)

    t.match(
      generatedFiles,
      [
        'Address.ts',
        'ApiResponse.ts',
        'Category.ts',
        'Customer.ts',
        'FooBARBaz.ts',
        'Order.ts',
        'Pet.ts',
        'Tag.ts',
        'User.ts',
        'paths__pet.ts',
        'paths__pet__petId_.ts',
        'paths__pet__petId__uploadImage.ts',
        'paths__pet_findByStatus.ts',
        'paths__pet_findByTags.ts',
        'paths__store_inventory.ts',
        'paths__store_order.ts',
        'paths__store_order__orderId_.ts',
        'paths__user.ts',
        'paths__user__username_.ts',
        'paths__user_createWithList.ts',
        'paths__user_login.ts',
        'paths__user_logout.ts'
      ],
      'generates the expected TS files'
    )

    const PetFile = resolveFromPackageRoot(outputPath, 'Pet.ts')
    const generatedPetFile = fs.readFileSync(PetFile, 'utf-8')

    t.same(
      generatedPetFile,
      `export const Pet = {
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
} as const;
`,
      'Pet.ts is created correctly'
    )

    const storeOrderFile = resolveFromPackageRoot(
      outputPath,
      'paths__store_order.ts'
    )
    const generatedStoreOrderFile = fs.readFileSync(storeOrderFile, 'utf-8')

    t.same(
      generatedStoreOrderFile,
      `export const paths__store_order = {
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
              shipDate: { type: "string", format: "date-time" },
              status: {
                type: "string",
                description: "Order Status",
                enum: ["placed", "approved", "delivered"],
              },
              complete: { type: "boolean" },
            },
            title: "Order",
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
              shipDate: { type: "string", format: "date-time" },
              status: {
                type: "string",
                description: "Order Status",
                enum: ["placed", "approved", "delivered"],
              },
              complete: { type: "boolean" },
            },
            title: "Order",
          },
        },
        "application/x-www-form-urlencoded": {
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
              shipDate: { type: "string", format: "date-time" },
              status: {
                type: "string",
                description: "Order Status",
                enum: ["placed", "approved", "delivered"],
              },
              complete: { type: "boolean" },
            },
            title: "Order",
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
                shipDate: { type: "string", format: "date-time" },
                status: {
                  type: "string",
                  description: "Order Status",
                  enum: ["placed", "approved", "delivered"],
                },
                complete: { type: "boolean" },
              },
              title: "Order",
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
`,
      'paths__store_order.ts created correctly'
    )
  })
})
