import { Command } from 'commander'
import filenamify from 'filenamify'
import fs from 'fs-extra'
import _get from 'lodash.get'
import _trimStart from 'lodash.trimstart'
import path from 'path'
import pino from 'pino'
import { exit } from 'process'
import YAML from 'yaml'

import type { JSONSchema4 } from 'json-schema'

import {
  fromSchema,
  fromParameter
} from '../utils/openapi-schema-to-json-schema-wrapper.js'
import { formatFileName } from '../utils/paths.js'

const COMPONENT_REF_REGEXP =
  /#\/components\/(callbacks|examples|headers|links|parameters|requestBodies|responses|schemas|securitySchemes)\/[^"]+/g
const INVALID_URI_CHARS_REGEXP = /[^a-zA-Z0-9\-._~:/?#[\]@!$&'()*+,;=]/g

export const adaptSchema = (
  generatedSchema: JSONSchema4,
  name: string,
  filename: string,
  definitionKeyword: string
) => {
  const sanitizedFilename = filename.replace(INVALID_URI_CHARS_REGEXP, '')
  delete generatedSchema.$schema
  generatedSchema.title = name
  generatedSchema.$id = `${definitionKeyword}/${sanitizedFilename}.json`

  if (generatedSchema.format?.includes('date')) {
    generatedSchema.tsType = 'Date'
  }
}

const processSchema = (
  schema: JSONSchema4,
  schemasPath: string,
  definitionKeyword: string,
  isArray: boolean
) => {
  Object.entries(schema).forEach(([key, value]) => {
    // for elements in an array the name would be its index if we were
    // to just use its key, so go into the parsed schema and get the
    // actual name so the files are more easily identifiable
    const name = isArray ? value.name : key
    const filename = formatFileName(
      _trimStart(filenamify(name, { replacement: '-' }), '-')
    )

    adaptSchema(value, name, filename, definitionKeyword)

    let schemaAsString = JSON.stringify(value, null, 2)
    const refs = schemaAsString.match(COMPONENT_REF_REGEXP)

    const pattern = 'components.schemas'
    refs?.forEach(ref => {
      let refName = ref.split('/').slice(-1).join('/')
      if (definitionKeyword !== pattern) {
        refName = path.join('..', pattern, refName)
      }
      schemaAsString = schemaAsString.replace(ref, `${refName}.json`)
    })

    const destinationDir = path.join(schemasPath, definitionKeyword)
    const destinationPath = path.join(destinationDir, `${filename}.json`)

    fs.ensureDirSync(destinationDir)
    fs.writeFileSync(destinationPath, schemaAsString)
  })
}

type ParameterType = {
  name: string
  in: string
  required?: boolean
  schema?: any
}

interface OpenApiPath {
  [path: string]: {
    [method: string]: {
      description?: string
      summary?: string
      parameters?: ParameterType[]
      requestBody?: JSONSchema4
      responses?: {
        [statusCode: string]: {
          description: string
          content?: {
            [contentType: string]: {
              schema?: any
            }
          }
        }
      }
    }
  }
}

function convertOpenApiPathsToSchema(paths: OpenApiPath): any {
  const pathObjects: { [key: string]: any } = {}
  for (const [path, methods] of Object.entries(paths)) {
    const pathObject = formatFileName(path)
    const schema: any = {
      type: 'object',
      properties: {},
      required: []
    }

    for (const [method, rawMethodSchema] of Object.entries(methods)) {
      const { description, summary, parameters, requestBody, responses } =
        rawMethodSchema
      schema.required.push(method)
      const schemaMethodProperties: JSONSchema4 = {
        type: 'object',
        required: []
      }

      if (description) {
        schemaMethodProperties['description'] = description
      }

      if (summary) {
        schemaMethodProperties['summary'] = summary
      }

      const methodPropertiesRequired = []
      const methodProperties: { [key: string]: any } = {}

      if (requestBody) {
        if (requestBody.required) {
          methodPropertiesRequired.push('requestBody')
        }

        const requestBodyObject: JSONSchema4 = {
          type: 'object',
          properties: {}
        }
        if (requestBody.description) {
          requestBodyObject.description = requestBody.description
        }
        if (requestBody.content) {
          const content: JSONSchema4 = {
            type: 'object',
            required: [],
            properties: {}
          }

          Object.entries(fromParameter(requestBody)).forEach(
            ([key, value]: [string, any]) => {
              const keyContent: JSONSchema4 = {}

              if (value?.$ref) {
                keyContent['$ref'] = value.$ref
              }
              if (value?.description) {
                keyContent['description'] = value.description
              }

              if (content.properties) {
                content.properties[key] = keyContent
              }
            }
          )
          if (requestBodyObject.properties) {
            requestBodyObject.properties['content'] = content
          }
        }

        methodProperties['requestBody'] = requestBodyObject
        delete methodProperties['requestBody']['$schema']
      }

      if (parameters) {
        methodPropertiesRequired.push('parameters')

        const requiredParameters: string[] = []
        const propertiesParameters: { [key: string]: JSONSchema4 } =
          parameters.reduce((a: { [key: string]: JSONSchema4 }, c) => {
            a[c.name] = fromParameter(c)
            delete a[c.name]['$schema']
            if (c.required) {
              requiredParameters.push(c.name)
            }
            return a
          }, {})

        const parametersSchema: JSONSchema4 = {
          type: 'object',
          properties: propertiesParameters
        }

        if (requiredParameters.length > 0) {
          parametersSchema['required'] = requiredParameters
        }

        methodProperties['parameters'] = parametersSchema
      }

      if (responses) {
        methodPropertiesRequired.push('responses')
        const responsesWithContent: { [key: string]: any } = {}
        for (const httpStatusCode in responses) {
          if (responses[httpStatusCode]['content']) {
            const responsesSchema = fromParameter(responses[httpStatusCode])
            for (const key in responsesSchema) {
              delete responsesSchema[key]['$schema']
            }
            responsesWithContent[httpStatusCode] = {
              type: 'object',
              properties: responsesSchema
            }
          } else {
            responsesWithContent[httpStatusCode] = fromSchema(
              responses[httpStatusCode]
            )

            delete responsesWithContent[httpStatusCode]['$schema']
          }
        }
        methodProperties['responses'] = {
          type: 'object',
          properties: responsesWithContent
        }
      }

      schemaMethodProperties['properties'] = methodProperties

      if (methodPropertiesRequired.length) {
        schemaMethodProperties['required'] = methodPropertiesRequired
      }

      schema.properties[method] = schemaMethodProperties
    }
    pathObjects[pathObject] = schema
  }

  return pathObjects
}

export const runCommand = (
  openApiPath: string,
  schemasPath: string,
  propertiesToExport?: string,
  logger = pino()
) => {
  fs.removeSync(schemasPath)
  fs.ensureDirSync(schemasPath)

  let openAPIContent

  try {
    openAPIContent = fs.readFileSync(openApiPath, 'utf8')
  } catch (e) {
    logger.error('❌ Could not find the OpenAPI file')
    exit(1)
  }

  const parsedOpenAPIContent = YAML.parse(openAPIContent)

  const definitionKeywords = [
    ...new Set([
      ...(propertiesToExport?.split(',') || []),
      'components.schemas'
    ])
  ]

  // console.log({ definitionKeywords })

  try {
    const generatedSchema = fromSchema(parsedOpenAPIContent, {
      definitionKeywords
    })

    definitionKeywords.forEach(key => {
      // const schema: JSONSchema4 = _get(generatedSchema, key)
      const schema: JSONSchema4 =
        key === 'paths'
          ? convertOpenApiPathsToSchema(
              // generatedSchema.paths['/pet/findByStatus']
              generatedSchema.paths
            )
          : _get(generatedSchema, key)

      // console.log(key, { schema })

      const isArray = Array.isArray(_get(parsedOpenAPIContent, key))
      processSchema(schema, schemasPath, key, isArray)
    })
  } catch (error) {
    console.log(error)
    logger.warn('Failed to convert non-object attribute, skipping')
    return
  }

  logger.info('✅ JSON schemas generated successfully from OpenAPI file')
}

const main = () => {
  const options = oas2json.optsWithGlobals()
  runCommand(options.input, options.output, options.properties, options.logger)
}

const oas2json = new Command('oas2json')

const description = `This command will generate JSON schemas from an OpenAPI file.

Examples:
  $ openapi-transformer-toolkit oas2json -i ./openapi.yml -o ./schemas
`

oas2json
  .summary('Create JSON schemas from an OpenAPI file')
  .description(description)
  .requiredOption('-i, --input <string>', 'Path to the OpenAPI file')
  .requiredOption(
    '-o, --output <string>',
    'Path to the folder where to output the schemas'
  )
  .option(
    '-p, --properties <string>',
    'Comma-separated list of properties to convert from the OpenAPI file'
  )
  .allowUnknownOption()
  .allowExcessArguments(true)
  .action(main)

export { oas2json }
