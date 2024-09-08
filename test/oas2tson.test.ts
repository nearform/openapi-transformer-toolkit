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
        'DateExample.ts',
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

    const OrderFile = resolveFromPackageRoot(outputPath, 'Order.ts')
    const generatedOrderFile = fs.readFileSync(OrderFile, 'utf-8')

    t.same(
      generatedOrderFile,
      `export const Order = {
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
  $id: "Order.json",
} as const;
`,
      'Order.ts is created correctly'
    )

    const DateExampleFile = resolveFromPackageRoot(outputPath, 'DateExample.ts')
    const generatedDateExampleFile = fs.readFileSync(DateExampleFile, 'utf-8')

    t.same(
      generatedDateExampleFile,
      `export const DateExample = {
  type: "string",
  format: "date-time",
  title: "DateExample",
  $id: "DateExample.json",
  tsType: "Date",
} as const;
`,
      'DateExample.ts is created correctly'
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
        'DateExample.ts',
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
})
