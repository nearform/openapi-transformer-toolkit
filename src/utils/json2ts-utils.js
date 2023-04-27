import path from 'path'
import json2TsModule from 'json2ts'

function convertJsonToTs(jsonContent, fileName) {
  let tsType = json2TsModule.convert(jsonContent)

  const interfaceName = path.basename(fileName, '.json')
  tsType = tsType.replace('RootObject', interfaceName)
  return tsType
}

export { convertJsonToTs }
