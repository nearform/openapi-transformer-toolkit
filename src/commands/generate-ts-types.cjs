const { Command } = require('commander');
const fs = require('fs-extra');
const path = require('path');
const json2Ts = require('json2ts')

const runCommand = (schemasPath, tsTypesPath) => {
  const schemaPaths = fs.readdirSync(schemasPath);
  let tsTypes = '';

  schemaPaths.forEach(schemaFileName => {
    const schemaName = path.basename(schemaFileName, '.json');
    const schemaPath = path.join(schemasPath, schemaFileName);
    const schemaContent = fs.readFileSync(schemaPath, 'utf-8');

    let tsType = json2Ts.convert(schemaContent);

    // Match all interface names.
    const interfaceNames = tsType.match(/interface (\w+)/g).map(name => name.replace('interface ', ''));

    // Replace interface names and references with schema name prefix.
    interfaceNames.forEach(interfaceName => {
      const newName = `${schemaName}${interfaceName}`;
      const reName = new RegExp(`interface ${interfaceName}\\b`, 'g');
      const reRef = new RegExp(`(\\s)${interfaceName}\\b`, 'g');
      tsType = tsType.replace(reName, `interface ${newName}`);
      tsType = tsType.replace(reRef, `$1${newName}`);
    });

    tsTypes += tsType;
  });

  fs.writeFileSync(tsTypesPath, tsTypes);
}

const main = () => {
  const arguments_ = generateTsTypes.args
  const options = generateTsTypes.optsWithGlobals()

  console.log('options', options)
  console.log('arguments', arguments_)

  runCommand(options.schemasPath, options.tsTypesPath)
}

const generateTsTypes = new Command('generate-ts-types')

const description = `This command takes an OpenAPI file and generates JSON schemas for each component schema defined within. The resulting JSON schemas can be used for validation and other purposes in your applications.`

generateTsTypes
  .summary('Creates a JSON schema from a TypeScript type')
  .description(
    description
  )
  .option('-s, --schemas-path <string>', 'Path to the schemas folder')
  .option('-t, --ts-types-path <string>', 'Path where to output to the TypeScript types file')
  .allowUnknownOption()
  .allowExcessArguments(true)
  .action(main)

module.exports = { generateTsTypes };
