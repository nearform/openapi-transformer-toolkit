import { Command } from 'commander'
import fs from 'fs-extra'
import YAML from 'yaml'
import schemaGenerator from '../utils/oas2json-module.cjs'
import path from 'path'

const COMPONENT_REF_REGEXP = /#\/components\/schemas\/[^"]+/g

function schemaAdapter(generatedSchema, name) {
  delete generatedSchema.$schema
  generatedSchema.title = name
  generatedSchema.$id = `${name}.json`

  if (generatedSchema.format?.includes('date')) {
    generatedSchema.tsType = 'Date'
  }
}

const runCommand = (openApiPath, schemasPath) => {
  fs.removeSync(schemasPath)
  fs.ensureDirSync(schemasPath)

  const openAPIContent = fs.readFileSync(openApiPath, 'utf8')
  const parsedOpenAPIContent = YAML.parse(openAPIContent)

  Object.entries(parsedOpenAPIContent.components.schemas).forEach(
    ([name, schema]) => {
      const generatedSchema = schemaGenerator.fromSchema(schema)
      schemaAdapter(generatedSchema, name)

      let stringifiedSchema = JSON.stringify(generatedSchema, undefined, 2)
      const results = stringifiedSchema.match(COMPONENT_REF_REGEXP)

      ;(results || []).forEach(element => {
        const refName = element.split('/').at(-1)

        stringifiedSchema = stringifiedSchema.replace(
          element,
          `${refName}.json`
        )
      })

      const destinationPath = path.join(schemasPath, `${name}.json`)
      fs.writeFileSync(destinationPath, stringifiedSchema)
    }
  )
}

const main = () => {
  const options = oas2json.optsWithGlobals()
  runCommand(options.input, options.output)
}

const oas2json = new Command('oas2json')

const description = `This command takes an OpenAPI file and generates JSON schemas for each component schema defined within. The resulting JSON schemas can be used for validation and other purposes in your applications.`

oas2json
  .summary('Creates a JSON schema from a TypeScript type')
  .description(description)
  .option('-i, --input <string>', 'OpenAPI file path')
  .option('-o, --output <string>', 'Folder to save the generated schemas')
  .allowUnknownOption()
  .allowExcessArguments(true)
  .action(main)

export { oas2json }
