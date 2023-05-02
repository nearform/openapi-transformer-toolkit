import tap from 'tap'
import fs from 'fs-extra'
import { adaptSchema, runCommand } from '../src/commands/oas2json.js'
import { resolveFromPackageRoot } from '../src/utils/paths.js'

tap.test('oas2json', async t => {
  t.test('adaptSchema function', async t => {
    const schema = {
      $schema: 'http://json-schema.org/draft-07/schema#',
      type: 'string',
      format: 'date'
    }

    adaptSchema(schema, 'TestSchema')

    t.strictSame(schema, {
      type: 'string',
      format: 'date',
      title: 'TestSchema',
      $id: 'TestSchema.json',
      tsType: 'Date'
    })
    t.end()
  })

  const TEST_DIRECTORY = resolveFromPackageRoot('test', 'temp')

  t.test('runCommand function', async t => {
    fs.ensureDirSync(TEST_DIRECTORY)
    const inputPath = './test/fixtures/openapi.yml'
    const outputPath = './test/temp/schemas'

    t.test(
      'should generate JSON schema files from the OpenAPI input',
      async t => {
        runCommand(inputPath, outputPath)

        const generatedFiles = fs.readdirSync(outputPath)
        t.match(generatedFiles, [
          'Address.json',
          'ApiResponse.json',
          'Category.json',
          'Customer.json',
          'Order.json',
          'Pet.json',
          'Tag.json',
          'User.json'
        ])

        const petSchema = fs.readJsonSync(
          resolveFromPackageRoot(outputPath, 'Pet.json')
        )
        t.same(petSchema, {
          required: ['name', 'photoUrls'],
          type: 'object',
          properties: {
            id: {
              type: 'integer',
              format: 'int64',
              minimum: -9223372036854776000,
              maximum: 9223372036854776000
            },
            name: {
              type: 'string'
            },
            category: {
              $ref: 'Category.json'
            },
            photoUrls: {
              type: 'array',
              items: {
                type: 'string'
              }
            },
            tags: {
              type: 'array',
              items: {
                $ref: 'Tag.json'
              }
            },
            status: {
              type: 'string',
              description: 'pet status in the store',
              enum: ['available', 'pending', 'sold']
            }
          },
          title: 'Pet',
          $id: 'Pet.json'
        })
        const customerSchema = fs.readJsonSync(
          resolveFromPackageRoot(outputPath, 'Customer.json')
        )
        t.same(customerSchema, {
          type: 'object',
          properties: {
            id: {
              type: 'integer',
              format: 'int64',
              minimum: -9223372036854776000,
              maximum: 9223372036854776000
            },
            username: {
              type: 'string'
            },
            address: {
              type: 'array',
              items: {
                $ref: 'Address.json'
              }
            }
          },
          title: 'Customer',
          $id: 'Customer.json'
        })

        t.end()
      }
    )
  })
  t.end()
})
