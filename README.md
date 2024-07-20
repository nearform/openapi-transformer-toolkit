# OpenAPI Transformer Toolkit

Effortlessly automate your API design-first development workflow by generating [JSON schemas](https://json-schema.org/) and [TypeScript types](https://www.typescriptlang.org/) from an [OpenAPI specification](https://spec.openapis.org/oas/v3.1.0).

## Table of Contents

* [Installation](#installation)
* [CLI](#cli)
  * [Create JSON Schema From OpenAPI Definitions](#create-json-schema-from-openapi-definitions)
    * * [Usage](#usage)
      * [Example](#example)
      * [Options](#options)
  * [Generate TypeScript types from OpenAPI Defintions](#generate-typescript-types-from-openapi-defintions)
    * * [Usage](#usage-1)
      * [Example](#example-1)
      * [Options](#options-1)
  * [Generate TypeScript types from JSON schemas](#generate-typescript-types-from-json-schemas)
    * * [Usage](#usage-2)
      * [Example](#example-2)
      * [Options](#options-2)
  * [Create TypeScript JSON Schema From OpenAPI Definitions](#create-typescript-json-schema-from-openapi-definitions)
    * * [Usage](#usage-3)
      * [Example](#example-3)
      * [Options](#options-3)
* [Programmatic Usage](#programmatic-usage)
  * [Generate JSON Schemas from OpenAPI](#generate-json-schemas-from-openapi)
  * [Generate TypeScript Types from OpenAPI](#generate-typescript-types-from-openapi)
  * [Generate TypeScript Types from JSON Schemas](#generate-typescript-types-from-json-schemas-1)
  * [Generate TypeScript exported JSON Schemas from OpenAPI](#generate-typescript-exported-json-schemas-from-openapi)
* [Example](#example-4)
* [Additional Configuration](#additional-configuration)

## Installation

You can install the package with npm (or another package manager):

```sh
$ npm install openapi-transformer-toolkit
```

If you want to install it globally, you can provide the `-g` flag.

Alternatively, you can run the CLI using `npx`:

```sh
$ npx openapi-transformer-toolkit [command] [options]
```

## CLI

For easier usage, the package includes the `openapi-transformer-toolkit` executable you can use from your CLI.

<details>
<summary>

### Create JSON Schema From OpenAPI Definitions

</summary>

Using the `oas2json` command you can create JSON schema records from OpenAPI definitions.

##### Usage

```sh
openapi-transformer-toolkit oas2json [options]
```

##### Example

```sh
$ openapi-transformer-toolkit oas2json -i ./openapi.yml -o ./schemas -p paths
```

##### Options

```
-i, --input <string>       Specify the path to the OpenAPI file
-o, --output <string>      Specify the path to the folder where you wish to output the schemas
-p, --properties <string>  Specify the properties/definitions in the OpenAPI file to convert in a comma-separated list (optional)
-h, --help                 Display help for command
```

</details>

<details>
<summary>

### Generate TypeScript types from OpenAPI Defintions

</summary>

Using the `oas2ts` command you can create TypeScript types from your OpenAPI definitions.

##### Usage

```sh
openapi-transformer-toolkit oas2ts [options]
```

##### Example

```sh
$ openapi-transformer-toolkit oas2ts -i ./openapi.yml -o ./types
```

```sh
$ openapi-transformer-toolkit oas2ts -i ./openapi.yml -o ./types -c ./config.json
```

##### Options

```
-i, --input <string>     Path to the OpenAPI file
-o, --output <string>    Path to the folder where to output the TypeScript types
-c, --config <string>    Path to the JSON/JS config file
-h, --help               Display help for command
```

See [Additional Configuration](#additional-configuration) for the `-c, --config` option.

</details>

<details>
<summary>

### Generate TypeScript types from JSON schemas

</summary>

Using the `json2ts` command you can create TypeScript types from your JSON Schema definitions.

##### Usage

```sh
openapi-transformer-toolkit json2ts [options]
```

##### Example

```sh
$ openapi-transformer-toolkit json2ts -i ./schemas -o ./types
```

```sh
$ openapi-transformer-toolkit json2ts -i ./schemas -o ./types -c ./config.json
```

##### Options

```
-i, --input <string>        Path to the JSON schemas folder
-o, --output <string>       Path to the folder where to output the TS files
-c, --config <string>       Path to the JSON/JS config file
-h, --help                  Display help for command
```

See [Additional Configuration](#additional-configuration) for the `-c, --config` option.

</details>

<details>
<summary>

### Create TypeScript JSON Schema From OpenAPI Definitions

</summary>

Using the `oas2tson` command you can create Typescript exported JSON schema records from OpenAPI definitions.

##### Usage

```sh
openapi-transformer-toolkit oas2tson [options]
```

##### Example

```sh
$ openapi-transformer-toolkit oas2tson -i ./openapi.yml -o ./schemas -p paths
```

##### Options

```
-i, --input <string>       Specify the path to the OpenAPI file
-o, --output <string>      Specify the path to the folder where you wish to output the schemas
-p, --properties <string>  Specify the properties/definitions in the OpenAPI file to convert in a comma-separated list (optional)
-h, --help                 Display help for command
```

</details>

## Programmatic Usage

You can also use the package programmatically by importing the necessary functions:

```javascript
import { oas2json, oas2ts, json2ts, oas2tson } from 'openapi-transformer-toolkit'
```

### Generate JSON Schemas from OpenAPI

To generate JSON schemas from your OpenAPI specification, provide the path to the OpenAPI file and the output directory for the generated schemas:

```javascript
const openAPIPath = 'path/to/openapi.yml'
const schemasPath = 'path/to/output/schemas'
const propertiesToConvert = 'paths'

oas2json(openAPIPath, schemasPath, propertiesToConvert)
```

### Generate TypeScript Types from OpenAPI

To generate TypeScript types from the OpenAPI specification, provide the path to the OpenAPI file and the output directory for the TypeScript types. Optionally, the third parameter can contain [configuration options](#additional-configuration)

```javascript
const openAPIPath = 'path/to/openapi.yml'
const tsTypesPath = 'path/to/output/types'
//
const options = {
  bannerComment: 'Custom banner content'
}

await oas2ts(openAPIPath, tsTypesPath, options)
```

### Generate TypeScript Types from JSON Schemas

To generate TypeScript types from the generated JSON schemas, provide the path to the JSON schema directory and the output directory for the TypeScript types. Optionally, the third parameter can contain [configuration options](#additional-configuration)

```javascript
const schemasPath = 'path/to/output/schemas'
const tsTypesPath = 'path/to/output/types'

await json2ts(schemasPath, tsTypesPath)
```

### Generate TypeScript exported JSON Schemas from OpenAPI

To generate TypeScript exported JSON schemas from your OpenAPI specification, provide the path to the OpenAPI file and the output directory for the generated schemas:

```javascript
const openAPIPath = 'path/to/openapi.yml'
const schemasPath = 'path/to/output/schemas'
const propertiesToConvert = 'paths'

oas2tson(openAPIPath, schemasPath, propertiesToConvert)
```

## Example

The [example](./example) folder contains an example OpenAPI specification and the generated JSON schemas and TypeScript types. To generate the JSON schemas and TypeScript types from the example OpenAPI specification, run:

```sh
$ npm run oas2json
```

and then:

```sh
$ npm run oas2ts
```

or:

```sh
$ npm run json2ts
```

```sh
$ npm run oas2json
```

And to generate TypeScript exported JSON schema from example OpenAPI specification, run:

```sh
$ npm run oas2tson
```

The generated JSON schemas and TypeScript types will be saved in the output schemas and types folders respectively.

## Additional Configuration

OpenAPI Transformer Toolkit package utilises the [json-schema-to-typescript](https://www.npmjs.com/package/json-schema-to-typescript) package.

This package allows you to specify [additional options which can be passed to the command when executing](https://www.npmjs.com/package/json-schema-to-typescript#user-content-options), for example to affect the style of output, or change how `additionalProperties` from your API definition is handled.

To utilise this feature, OpenAPI Transformer Toolkit can read these additional options from a file when being used from a CLI. [An example of this can be found here](https://github.com/nearform/openapi-transformer-toolkit/blob/master/example/json-schema-to-typescript-config.json).

When using OpenAPI Transformer Toolkit programmatically, these options can optionally be supplied as the third argument to the `oas2ts` and `json2ts` functions.
