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

    adaptSchema(schema, 'TestSchema', 'TestSchema')

    t.strictSame(
      schema,
      {
        type: 'string',
        format: 'date',
        title: 'TestSchema',
        $id: 'TestSchema.json',
        tsType: 'Date'
      },
      'works as expected'
    )
  })

  const TEST_DIRECTORY = resolveFromPackageRoot('test', 'temp')

  t.test('runCommand function', async t => {
    fs.ensureDirSync(TEST_DIRECTORY)
    const inputPath = './test/fixtures/openapi.yml'
    const outputPath = './test/temp/schemas'
    const schemasDir = `${outputPath}/components.schemas`

    t.test(
      'should generate JSON schema files from the OpenAPI input',
      async t => {
        runCommand(inputPath, outputPath)

        const generatedFiles = fs.readdirSync(schemasDir)
        t.match(
          generatedFiles,
          [
            'Address.json',
            'ApiResponse.json',
            'Category.json',
            'Customer.json',
            'Order.json',
            'Pet.json',
            'Tag.json',
            'User.json'
          ],
          'generates the expected JSON files'
        )

        const petSchema = fs.readJsonSync(
          resolveFromPackageRoot(schemasDir, 'Pet.json')
        )
        t.same(
          petSchema,
          {
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
              },
              nullableValue: {
                type: ['string', 'null'],
                description: 'example nullable value'
              }
            },
            title: 'Pet',
            $id: 'Pet.json'
          },
          'Pet.json schema is created correctly'
        )
        const customerSchema = fs.readJsonSync(
          resolveFromPackageRoot(schemasDir, 'Customer.json')
        )
        t.same(
          customerSchema,
          {
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
          },
          'Customer.json schema is created correctly'
        )
      }
    )

    t.test('should convert components.schemas automatically', async t => {
      runCommand(inputPath, outputPath, 'components.requestBodies')

      const generatedDirs = fs.readdirSync(outputPath)
      t.match(
        generatedDirs,
        ['components.requestBodies', 'components.schemas'],
        'generates the expected directories'
      )

      const petReqBody = fs.readJSONSync(
        resolveFromPackageRoot(outputPath, 'components.requestBodies/Pet.json')
      )
      t.same(
        petReqBody,
        {
          description: 'Pet object that needs to be added to the store',
          content: {
            'application/json': {
              schema: {
                $ref: 'Pet.json'
              }
            },
            'application/xml': {
              schema: {
                $ref: 'Pet.json'
              }
            }
          },
          title: 'Pet',
          $id: 'Pet.json'
        },
        'generates the expected JSON'
      )
    })

    t.test(
      'should dynamically find the name when converting an array property',
      async t => {
        runCommand(inputPath, outputPath, 'tags')

        const generatedDirs = fs.readdirSync(outputPath)
        t.match(
          generatedDirs,
          ['components.schemas', 'tags'],
          'generates the expected directories'
        )
        const generatedFiles = fs.readdirSync(`${outputPath}/tags`)
        t.match(generatedFiles, ['pet.json', 'store.json', 'user.json'])

        const petTag = fs.readJSONSync(
          resolveFromPackageRoot(outputPath, 'tags/pet.json')
        )
        t.same(
          petTag,
          {
            name: 'pet',
            description: 'Everything about your Pets',
            title: 'pet',
            $id: 'pet.json'
          },
          'generates the expected name for array elements'
        )
      }
    )
  })
})
