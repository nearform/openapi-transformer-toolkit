import { convertJsonToTs } from '../src/utils/json2ts-utils.js'

describe('convertJsonToTs', () => {
  test('should replace RootObject with the correct interface name', () => {
    const inputJson = `
{
  "type": "object",
  "properties": {
    "name": { "type": "string" },
    "age": { "type": "integer" }
  },
  "title": "Person",
  "$id": "Person.json"
}
    `

    const expectedOutput = `
export interface Name {
\ttype: string;
}

export interface Age {
\ttype: string;
}

export interface Property {
\tname: Name;
\tage: Age;
}

export interface Person {
\ttype: string;
\tproperties: Property;
\ttitle: string;
\t$id: string;
}`

    const actualOutput = convertJsonToTs(inputJson, 'Person.json')

    expect(actualOutput.trim()).toEqual(expectedOutput.trim())
  })
})
