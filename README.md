# OpenAPI Transformer Toolkit

Effortlessly automate your design-first API development workflow by generating JSON schemas and TypeScript types from an OpenAPI specification.

## Table of Contents

- [Installation](#installation)
- [CLI](#cli)
- [Programmatic Usage](#programmatic-usage)
  - [Generate JSON Schemas from OpenAPI](#generate-json-schemas-from-openapi)
  - [Generate TypeScript Types from OpenAPI](#generate-typescript-types-from-openapi)
  - [Generate TypeScript Types from JSON Schemas](#generate-typescript-types-from-json-schemas)
- [Example](#example)

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

- Generate JSON schemas from OpenAPI:
  - `openapi-transformer-toolkit oas2json -i < input > -o < output > [-m]`
- Generate TS types from OpenAPI:
  - `openapi-transformer-toolkit oas2ts -i < input > -o < output > [-c < config > -m]`
- Generate TS types from JSON schemas:
  - `openapi-transformer-toolkit json2ts -i < input > -o < output > [-c < config > -m]`

The `-c` arguments accepts a configuration file for the [json-schema-to-typescript](https://www.npmjs.com/package/json-schema-to-typescript) package.

For example:

```sh
$ openapi-transformer-toolkit oas2json -i ./openapi.yml -o ./schemas
```
```sh
$ openapi-transformer-toolkit oas2ts -i ./openapi.yml -o ./types
```
```sh
$ openapi-transformer-toolkit json2ts -i ./schemas -o ./types
```

## Programmatic Usage

You can also use the package programmatically by importing the necessary functions:

```javascript
import { oas2json, oas2ts, json2ts } from 'openapi-transformer-toolkit';
```

### Generate JSON Schemas from OpenAPI

To generate JSON schemas from your OpenAPI specification, provide the path to the OpenAPI file and the output directory for the generated schemas:

```javascript
const openAPIPath = 'path/to/openapi.yml';
const schemasPath = 'path/to/output/schemas';

oas2json(openAPIPath, schemasPath);
```

### Generate TypeScript Types from OpenAPI

To generate TypeScript types from the OpenAPI specification, provide the path to the OpenAPI file and the output directory for the TypeScript types:

```javascript
const openAPIPath = 'path/to/openapi.yml';
const tsTypesPath = 'path/to/output/types';
await oas2ts(openAPIPath, tsTypesPath);
```

### Generate TypeScript Types from JSON Schemas

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
$ npm run oas2ts
```

or:

```sh
$ npm run json2ts
```



The generated JSON schemas and TypeScript types will be saved in the output schemas and types folders respectively.
