import { Command } from 'commander'
import fs from 'fs-extra'
import path from 'path'
// import { convertJsonToTs } from '../utils/json2ts-utils.js'
import { compileFromFile } from 'json-schema-to-typescript'
import { exit } from 'process'
import { resolveFromPackageRoot } from '../utils/paths.js'
import { doNotEditText } from '../utils/do-not-edit-text.js'
// import { doNotEditText } from '../utils/do-not-edit-text.js'

const runCommand = (schemasPath, tsTypesPath) => {
  let schemaPaths

  try {
    schemaPaths = fs.readdirSync(schemasPath)
  } catch (e) {
    console.error('❌ Could not find the schemas folder')
    exit(1)
  }

  fs.ensureDirSync(tsTypesPath)

  schemaPaths.forEach(schemaFileName => {
    const schemaPath = resolveFromPackageRoot(schemasPath, schemaFileName)
    compileFromFile(schemaPath, {
      cwd: schemasPath,
      bannerComment: doNotEditText
    }).then(ts => {
      const tsFileName = schemaFileName.replace('.json', '.d.ts')
      fs.writeFileSync(path.join(tsTypesPath, tsFileName), ts)
    })
  })
}

const main = () => {
  const options = json2ts.optsWithGlobals()
  runCommand(options.input, options.output)
}

const json2ts = new Command('json2ts')

const description = `This command will generate TypeScript types from JSON schemas.

Examples
  $ oas-codegen json2ts -i ./schemas -o ./types
`

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
