import { Command } from 'commander'
import fs from 'fs-extra'
import path from 'path'
import { convertJsonToTs } from '../utils/json2ts-utils.js'

const runCommand = (schemasPath, tsTypesPath) => {
  const schemaPaths = fs.readdirSync(schemasPath)
  fs.ensureDirSync(tsTypesPath)

  schemaPaths.forEach(schemaFileName => {
    const schemaPath = path.join(schemasPath, schemaFileName)
    const schemaContent = fs.readFileSync(schemaPath, 'utf-8')

    const tsType = convertJsonToTs(schemaContent, schemaFileName)

    const tsFileName = schemaFileName.replace('.json', '.d.ts')
    const tsFilePath = path.join(tsTypesPath, tsFileName)
    fs.writeFileSync(tsFilePath, tsType)
  })
}

const main = () => {
  const options = json2ts.optsWithGlobals()
  runCommand(options.input, options.output)
}

const json2ts = new Command('json2ts')

const description = `This command takes an OpenAPI file and generates JSON schemas for each component schema defined within. The resulting JSON schemas can be used for validation and other purposes in your applications.`

json2ts
  .summary('Creates a JSON schema from a TypeScript type')
  .description(description)
  .option('-i, --input <string>', 'Path to the schemas folder')
  .option(
    '-o, --output <string>',
    'Path where to output to the TypeScript types file'
  )
  .allowUnknownOption()
  .allowExcessArguments(true)
  .action(main)

export { json2ts }
