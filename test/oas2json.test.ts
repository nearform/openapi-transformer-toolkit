import fs from 'fs-extra'
import tap from 'tap'
import { adaptSchema, runCommand } from '../src/commands/oas2json.js'
import { resolveFromPackageRoot } from '../src/utils/paths.js'

import type { JSONSchema4 } from 'json-schema'

tap.test('oas2json', async t => {
  t.test('adaptSchema function', async t => {
    const schema: JSONSchema4 = {
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
    const pathsDir = `${outputPath}/paths`

    t.test(
      'should generate JSON schema files from the OpenAPI input',
      async t => {
        runCommand(inputPath, outputPath, 'paths')

        const generatedSchemas = fs.readdirSync(schemasDir)
        t.match(
          generatedSchemas,
          [
            'Address.json',
            'ApiResponse.json',
            'Category.json',
            'Customer.json',
            'FooBARBaz.json',
            'Order.json',
            'Pet.json',
            'Tag.json',
            'User.json'
          ],
          'generates the expected JSON files for schemas'
        )

        const generatedPaths = fs.readdirSync(pathsDir)
        t.match(
          generatedPaths,
          [
            'pet-findByStatus.json',
            'pet-findByTags.json',
            'pet-{petId}-uploadImage.json',
            'pet-{petId}.json',
            'pet.json',
            'store-inventory.json',
            'store-order-{orderId}.json',
            'store-order.json',
            'user-createWithList.json',
            'user-login.json',
            'user-logout.json',
            'user-{username}.json',
            'user.json'
          ],
          'generates the expected JSON files for paths'
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

        const petPath = fs.readJsonSync(
          resolveFromPackageRoot(pathsDir, 'pet.json')
        )
        t.same(
          petPath,
          {
            put: {
              tags: ['pet'],
              summary: 'Update an existing pet',
              description: 'Update an existing pet by Id',
              operationId: 'updatePet',
              requestBody: {
                $ref: 'PetBody.json' // File generated from #/components/requestBodies/PetBody
              },
              responses: {
                200: {
                  description: 'Successful operation',
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
                  }
                },
                400: {
                  description: 'Invalid ID supplied'
                },
                404: {
                  description: 'Pet not found'
                },
                405: {
                  description: 'Validation exception'
                }
              },
              security: [
                {
                  petstore_auth: ['write:pets', 'read:pets']
                }
              ]
            },
            post: {
              tags: ['pet'],
              summary: 'Add a new pet to the store',
              description: 'Add a new pet to the store',
              operationId: 'addPet',
              requestBody: {
                $ref: 'PetBody.json'
              },
              responses: {
                200: {
                  description: 'Successful operation',
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
                  }
                },
                405: {
                  description: 'Invalid input'
                }
              },
              security: [
                {
                  petstore_auth: ['write:pets', 'read:pets']
                }
              ]
            },
            title: '/pet',
            $id: 'pet.json'
          },
          'pet.json path is created correctly'
        )

        const petPetIdPath = fs.readJsonSync(
          resolveFromPackageRoot(pathsDir, 'pet-{petId}.json')
        )
        t.same(
          petPetIdPath,
          {
            get: {
              tags: ['pet'],
              summary: 'Find pet by ID',
              description: 'Returns a single pet',
              operationId: 'getPetById',
              parameters: [
                {
                  name: 'petId',
                  in: 'path',
                  description: 'ID of pet to return',
                  required: true,
                  schema: {
                    type: 'integer',
                    format: 'int64'
                  }
                }
              ],
              responses: {
                200: {
                  description: 'successful operation',
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
                  }
                },
                400: {
                  description: 'Invalid ID supplied'
                },
                404: {
                  description: 'Pet not found'
                }
              },
              security: [
                {
                  api_key: []
                },
                {
                  petstore_auth: ['write:pets', 'read:pets']
                }
              ]
            },
            post: {
              tags: ['pet'],
              summary: 'Updates a pet in the store with form data',
              description: '',
              operationId: 'updatePetWithForm',
              parameters: [
                {
                  name: 'petId',
                  in: 'path',
                  description: 'ID of pet that needs to be updated',
                  required: true,
                  schema: {
                    type: 'integer',
                    format: 'int64'
                  }
                },
                {
                  name: 'name',
                  in: 'query',
                  description: 'Name of pet that needs to be updated',
                  schema: {
                    type: 'string'
                  }
                },
                {
                  name: 'status',
                  in: 'query',
                  description: 'Status of pet that needs to be updated',
                  schema: {
                    type: 'string'
                  }
                }
              ],
              responses: {
                405: {
                  description: 'Invalid input'
                }
              },
              security: [
                {
                  petstore_auth: ['write:pets', 'read:pets']
                }
              ]
            },
            delete: {
              tags: ['pet'],
              summary: 'Deletes a pet',
              description: 'delete a pet',
              operationId: 'deletePet',
              parameters: [
                {
                  name: 'api_key',
                  in: 'header',
                  description: '',
                  required: false,
                  schema: {
                    type: 'string'
                  }
                },
                {
                  name: 'petId',
                  in: 'path',
                  description: 'Pet id to delete',
                  required: true,
                  schema: {
                    type: 'integer',
                    format: 'int64'
                  }
                }
              ],
              responses: {
                400: {
                  description: 'Invalid pet value'
                }
              },
              security: [
                {
                  petstore_auth: ['write:pets', 'read:pets']
                }
              ]
            },
            title: '/pet/{petId}',
            $id: 'pet-petId.json' // Does not contain any invalid URI chars (i.e. curly braces)
          },
          'pet-{petId}.json path is created correctly'
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
        resolveFromPackageRoot(
          outputPath,
          'components.requestBodies/PetBody.json'
        )
      )
      t.same(
        petReqBody,
        {
          description: 'A JSON object containing pet information',
          required: true,
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
            },
            'application/x-www-form-urlencoded': {
              schema: {
                $ref: 'Pet.json'
              }
            }
          },
          title: 'PetBody',
          $id: 'PetBody.json'
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
