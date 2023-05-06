> NOTE: This project is still **very much** in Alpha. Most stuff
> doesn't work and what does may change at any moment

# Zod Binary Interface

Zod Binary Interface is a FOSS library that allows for the
encoding and decoding of JavaScript and Typescript objects to
and from binary. It accomplishes this by utilizing the often
already existing [Zod](https://github.com/colinhacks/zod) schema
definitions.

## Usage

### Installing

```shell
# NPM
npm install zod-binary-interface
# Yarn
yarn add zod-binary-interface
```

### Global Instance

The entire library is interacted with through a global instance of `ZodBinaryInterface`,
which stores and flattens the zod schema all data goes through

```typescript
import { z } from "zod";
import { ZodBinaryInterface } from "zod-binary-interface";

const exampleSchema = z.schema({
  foo: z.string()
  bar: z.number()
});

const zbi = ZodBinaryInterface.fromSchema(exampleSchema);
```

### Encoding

Encoding transforms your data from a JavaScript object to a binary
[ArrayBuffer](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/ArrayBuffer).

Binary ArrayBuffers like these can be easily transferred in requests and
[saved to local files](./docs/recipies.md#download-to-file)

```typescript
const sampleData: z.infer<exampleSchema> = {
  foo: "Foo",
  bar: 100,
};

const buffer = zbi.encode(sampleData);
//    ^?: ArrayBuffer
```

### Decoding

Encoding transforms your data from a Javascript ArrayBuffer, back into the original object form.

Decoding internally utilizes the supplied zod schema to validate the data.

```typescript
const data = zbi.decode(sampleData);
//    ^?: { foo: string, bar: number }
```

## Benchmarks

TODO

We know for certain that we will beat JSON in size, but the exact ratio is yet to be known and likely depends on the data.

## Developing

```shell
git clone https://github.com/KennanHunter/zod-binary-interface.git
cd zod-binary-interface
yarn test
```

There exists recommended extensions and basic settings in the [.vscode](./.vscode) folder.
