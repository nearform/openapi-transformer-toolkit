import { Command } from 'commander'
import fs from 'fs-extra'
import YAML from 'yaml'
import path from 'path'
import { exit } from 'process'
import { fromSchema } from '../utils/openapi-schema-to-json-schema-wrapper.cjs'

const COMPONENT_REF_REGEXP = /#\/components\/schemas\/[^"]+/g

export const adaptSchema = (generatedSchema, name) => {
  delete generatedSchema.$schema
  generatedSchema.title = name
  generatedSchema.$id = `${name}.json`

  if (generatedSchema.format?.includes('date')) {
    generatedSchema.tsType = 'Date'
  }
}

const processSchema = (name, schema, schemasPath) => {
  const generatedSchema = fromSchema(schema)
  adaptSchema(generatedSchema, name)

  let stringifiedSchema = JSON.stringify(generatedSchema, undefined, 2)
  const results = stringifiedSchema.match(COMPONENT_REF_REGEXP)

  ;(results || []).forEach(element => {
    const refName = element.split('/').slice(-1)
    stringifiedSchema = stringifiedSchema.replace(element, `${refName}.json`)
  })

  const destinationPath = path.join(schemasPath, `${name}.json`)
  fs.writeFileSync(destinationPath, stringifiedSchema)
}

export const runCommand = (openApiPath, schemasPath) => {
  fs.removeSync(schemasPath)
  fs.ensureDirSync(schemasPath)

  let openAPIContent

  try {
    openAPIContent = fs.readFileSync(openApiPath, 'utf8')
  } catch (e) {
    console.error('❌ Could not find the OpenAPI file')
    exit(1)
  }

  const parsedOpenAPIContent = YAML.parse(openAPIContent)

  Object.entries(parsedOpenAPIContent.components.schemas).forEach(
    ([name, schema]) => {
      processSchema(name, schema, schemasPath)
    }
  )

  console.log('✅ JSON schemas generated successfully')
}

const main = () => {
  const options = oas2json.optsWithGlobals()
  runCommand(options.input, options.output)
}

const oas2json = new Command('oas2json')

const description = `This command will generate JSON schemas from an OpenAPI file.

Examples:
  $ openapi-codegen oas2json -i ./openapi.yml -o ./schemas
`

oas2json
  .summary('Create JSON schemas from an OpenAPI file')
  .description(description)
  .requiredOption('-i, --input <string>', 'Path to the OpenAPI file')
  .requiredOption(
    '-o, --output <string>',
    'Path to the folder where to output the schemas'
  )
  .allowUnknownOption()
  .allowExcessArguments(true)
  .action(main)

export { oas2json }
