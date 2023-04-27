const { Command } = require('commander');
const fs = require('fs-extra');
const path = require('path');
const json2TsModule = require('json2ts')

const runCommand = (schemasPath, tsTypesPath) => {
  const schemaPaths = fs.readdirSync(schemasPath);
  let tsTypes = '';

  schemaPaths.forEach(schemaFileName => {
    // const schemaName = path.basename(schemaFileName, '.json');
    const schemaPath = path.join(schemasPath, schemaFileName);
    const schemaContent = fs.readFileSync(schemaPath, 'utf-8');

    let tsType = json2TsModule.convert(schemaContent);


    tsTypes += tsType;
  });

  fs.writeFileSync(tsTypesPath, tsTypes);
}

const main = () => {
  const options = json2ts.optsWithGlobals()
  runCommand(options.input, options.output)
}

const json2ts = new Command('json2ts')

const description = `This command takes an OpenAPI file and generates JSON schemas for each component schema defined within. The resulting JSON schemas can be used for validation and other purposes in your applications.`

json2ts
  .summary('Creates a JSON schema from a TypeScript type')
  .description(
    description
  )
  .option('-i, --input <string>', 'Path to the schemas folder')
  .option('-o, --output <string>', 'Path where to output to the TypeScript types file')
  .allowUnknownOption()
  .allowExcessArguments(true)
  .action(main)

module.exports = { json2ts };
