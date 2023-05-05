# OpenAPI Transformer Toolkig

Effortlessly automate your design-first API development workflow by generating JSON schemas and TypeScript types from an OpenAPI specification.

## Installation

You can install the package with npm (or another package manager):

```sh
$ npm install openapi-transformer-toolkit
```

If you want to install it globally, you can provide the `-g` flag.

Alternatively, you can run the CLI using `npx`:

```sh
$ npx openapi-transformer-toolkit
```

## CLI

The package includes CLI commands for easier usage. Use the `openapi-transformer-toolkit` executable followed by the command and required options:

- `openapi-transformer-toolkit oas2json -i < input > -o < output >` - Generate JSON schemas from an OpenAPI file
- `openapi-transformer-toolkit json2ts -i < input > -o < output > [-c < config >]` - Generate TypeScript types from JSON schemas

The `-c` arguments accepts a configuration file for the [json-schema-to-typescript](https://www.npmjs.com/package/json-schema-to-typescript) package.

For example:

```sh
$ openapi-transformer-toolkit oas2json -i ./openapi.yml -o ./schemas
```
```sh
$ openapi-transformer-toolkit json2ts -i ./schemas -o ./types
```

## Programmatic Usage

You can also use the package programmatically by importing the necessary functions:

```javascript
import { oas2json, json2ts } from 'openapi-transformer-toolkit';
```

### Generate JSON Schemas

To generate JSON schemas from your OpenAPI specification, provide the path to the OpenAPI file and the output directory for the generated schemas:

```javascript
const openAPIPath = 'path/to/openapi.yml';
const schemasPath = 'path/to/output/schemas';

oas2json(openAPIPath, schemasPath);
```

### Generate TypeScript Types

To generate TypeScript types from the generated JSON schemas, provide the path to the JSON schema directory and the output directory for the TypeScript types:

```javascript
const schemasPath = 'path/to/output/schemas';
const tsTypesPath = 'path/to/output/types';
await json2ts(schemasPath, tsTypesPath);
```

## Example

The [example](./example) folder contains an example OpenAPI specification and the generated JSON schemas and TypeScript types. To generate the JSON schemas and TypeScript types from the example OpenAPI specification, run:

```sh
$ npm run oas2json
```

and then:

```sh
$ npm run json2ts
```

The generated JSON schemas and TypeScript types will be saved in the output schemas and types folders respectively.
