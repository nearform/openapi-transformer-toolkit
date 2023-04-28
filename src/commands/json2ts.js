import { Command } from 'commander'
import fs from 'fs-extra'
import path from 'path'
// import { convertJsonToTs } from '../utils/json2ts-utils.js'
import { compileFromFile } from 'json-schema-to-typescript'
import { exit } from 'process'
import { resolveFromPackageRoot } from '../utils/paths.js'
import { doNotEditText } from '../utils/do-not-edit-text.js'
import $RefParser from '@bcherny/json-schema-ref-parser'
// import { doNotEditText } from '../utils/do-not-edit-text.js'

const runCommand = async (schemasPath, tsTypesPath) => {
  let schemaPaths

  try {
    schemaPaths = fs.readdirSync(schemasPath)
  } catch (e) {
    console.error('❌ Could not find the schemas folder')
    exit(1)
  }

  fs.ensureDirSync(tsTypesPath)

  for (const schemaFileName of schemaPaths) {
    const schemaPath = resolveFromPackageRoot(schemasPath, schemaFileName)

    const ts = await compileFromFile(schemaPath, {
      cwd: schemasPath,
      bannerComment: doNotEditText,
      declareExternallyReferenced: false
    })

    const interfaceName = schemaFileName.replace('.json', '')

    const parser = new $RefParser()
    await parser.dereference(schemaPath)

    const imports = Object.values(parser.$refs.values())
      .filter(
        refSchema =>
          refSchema.$id && refSchema.title && refSchema.title !== interfaceName
      )
      .map(
        refSchema =>
          `import { ${refSchema.title} } from './${refSchema.$id.replace(
            '.json',
            ''
          )}'`
      )
      .join('\n')

    const tsWithImports = `${imports ? `${imports}\n\n` : ''}${ts}`
    const tsFileName = schemaFileName.replace('.json', '.d.ts')

    fs.writeFileSync(path.join(tsTypesPath, tsFileName), tsWithImports)
  }
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
