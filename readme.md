> NOTE: This project is still **very much** in Alpha. Most stuff
> doesn't work and what does may change at any moment

# Zod Binary Interface

![GitHub Workflow Status](https://img.shields.io/github/actions/workflow/status/kennanhunter/zod-binary-interface/publish.yml?style=for-the-badge)
![Lines of code](https://img.shields.io/tokei/lines/github/kennanhunter/zod-binary-interface?style=for-the-badge)
![npm](https://img.shields.io/npm/dt/zod-binary-interface?style=for-the-badge)
![NPM](https://img.shields.io/npm/l/zod-binary-interface?style=for-the-badge)
[![Code coverage](https://img.shields.io/codecov/c/github/kennanhunter/zod-binary-interface?style=for-the-badge)](https://app.codecov.io/gh/KennanHunter/zod-binary-interface)

Zod Binary Interface is a FOSS library that allows for the
encoding and decoding of JavaScript and Typescript objects to
and from binary. It accomplishes this by utilizing the often
pre-existing [Zod](https://github.com/colinhacks/zod) schema
definitions.

## Usage

### Installing

```shell
# npm
npm install zod-binary-interface
# Yarn
yarn add zod-binary-interface
```

### Global Instance

The entire library is interacted with through a global instance of `ZodBinaryInterface`,
which stores and flattens the zod schema all data goes through.

```typescript
import { z } from "zod";
import { ZodBinaryInterface } from "zod-binary-interface";

const exampleSchema = z.schema({
  foo: z.string(),
  bar: z.number(),
});

const zbi = ZodBinaryInterface.fromSchema(exampleSchema);
```

### Encoding

Encoding transforms your data from a JavaScript object to a binary
[ArrayBuffer](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/ArrayBuffer).

Binary ArrayBuffers like these can be easily transferred in requests and
[saved to local files](./docs/recipies.md#download-to-file).

```typescript
const sampleData: z.infer<typeof exampleSchema> = {
  foo: "Foo",
  bar: 100,
};

const buffer = zbi.encode(sampleData);
//    ^?: ArrayBuffer
```

### Decoding

Decoding transforms your data from a Javascript ArrayBuffer, back into the original object form.

Decoding internally utilizes the supplied zod schema to validate the data.

```typescript
const data = zbi.decode(buffer);
//    ^?: { foo: string, bar: number }
```

## Benchmarks

Benchmarking is an ongoing process.

| Name                                   | Iterations | ZBI Time         | ZBI Size | JSON Time        | JSON Size |
| -------------------------------------- | ---------- | ---------------- | -------- | ---------------- | --------- |
| [Booleans](benchmark/data/booleans.ts) | 1          | 1.699104 seconds | 4 bytes  | 0.046286 seconds | 455 bytes |
| [Booleans](benchmark/data/booleans.ts) | 100        | 0.137128 seconds | 4 bytes  | 0.008153 seconds | 455 bytes |

## Developing

```shell
git clone https://github.com/KennanHunter/zod-binary-interface.git
cd zod-binary-interface

yarn
yarn test

# Benchmarking (builds in background)
yarn benchmark

# Only needed for final publishing
yarn build
```

There exists recommended extensions and basic settings in the [.vscode](./.vscode) folder.
