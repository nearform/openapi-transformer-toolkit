const { Command } = require('commander');
const fs = require('fs-extra');
const YAML = require('yaml');
const schemaGenerator = require('@openapi-contrib/openapi-schema-to-json-schema');
const path = require('path');

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
  const arguments_ = generateJsonSchema.args
  const options = generateJsonSchema.optsWithGlobals()

  console.log('options', options)
  console.log('arguments', arguments_)

  runCommand(options.openApiPath, options.schemasPath)
}

const generateJsonSchema = new Command('generate-json-schema')

const description = `This command takes an OpenAPI file and generates JSON schemas for each component schema defined within. The resulting JSON schemas can be used for validation and other purposes in your applications.`

generateJsonSchema
  .summary('Creates a JSON schema from a TypeScript type')
  .description(
    description
  )
  .option('-o, --open-api-path <string>', 'OpenAPI file path')
  .option('-s, --schemas-path <string>', 'Folder to save the generated schemas')
  .allowUnknownOption()
  .allowExcessArguments(true)
  .action(main)

module.exports = { generateJsonSchema };
