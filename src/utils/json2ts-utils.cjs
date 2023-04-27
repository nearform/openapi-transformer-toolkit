const path = require('path')
const json2TsModule = require('json2ts')

function convertJsonToTs(jsonContent, fileName) {
  let tsType = json2TsModule.convert(jsonContent)

  const interfaceName = path.basename(fileName, '.json')
  tsType = tsType.replace('RootObject', interfaceName)
  return tsType
}

module.exports = {
  convertJsonToTs
}
