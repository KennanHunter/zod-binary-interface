import { z } from "zod";
import { showArrAsBinary } from "../shared/showArrAsBinary";
import { flattenSchema } from "../shared/flatten";
import { encode } from "./encode";

describe("encoding", () => {
  test("Encode simple number", () => {
    const schema = z.number();
    const data: z.infer<typeof schema> = 69;

    const encodedData = encode(data, flattenSchema(schema)).toUint8Array();

    expect(encodedData.at(0)).toEqual(0b01000101);
  });
  test("Encode single string", () => {
    const sampleData =
      'Zod is a TypeScript-first schema declaration and validation library. I\'m using the term "schema" to broadly refer to any data type, from a simple string to a complex nested object.';

    const sampleSchema = z.string();

    const encodedData = encode(
      sampleData,
      flattenSchema(sampleSchema)
    ).toUint8Array();

    expect(encodedData).toHaveLength(181);
    expect(encodedData).toEqual(
      new Uint8Array([
        90, 111, 100, 32, 105, 115, 32, 97, 32, 84, 121, 112, 101, 83, 99, 114,
        105, 112, 116, 45, 102, 105, 114, 115, 116, 32, 115, 99, 104, 101, 109,
        97, 32, 100, 101, 99, 108, 97, 114, 97, 116, 105, 111, 110, 32, 97, 110,
        100, 32, 118, 97, 108, 105, 100, 97, 116, 105, 111, 110, 32, 108, 105,
        98, 114, 97, 114, 121, 46, 32, 73, 39, 109, 32, 117, 115, 105, 110, 103,
        32, 116, 104, 101, 32, 116, 101, 114, 109, 32, 34, 115, 99, 104, 101,
        109, 97, 34, 32, 116, 111, 32, 98, 114, 111, 97, 100, 108, 121, 32, 114,
        101, 102, 101, 114, 32, 116, 111, 32, 97, 110, 121, 32, 100, 97, 116,
        97, 32, 116, 121, 112, 101, 44, 32, 102, 114, 111, 109, 32, 97, 32, 115,
        105, 109, 112, 108, 101, 32, 115, 116, 114, 105, 110, 103, 32, 116, 111,
        32, 97, 32, 99, 111, 109, 112, 108, 101, 120, 32, 110, 101, 115, 116,
        101, 100, 32, 111, 98, 106, 101, 99, 116, 46, 0b0000_0000,
      ])
    );
  });
  test("Encode multiple booleans", () => {
    const schema = z.object({
      foo: z.boolean(),
      bar: z.boolean(),
      baz: z.boolean(),
      fez: z.boolean(),
    });
    const sampleData: z.infer<typeof schema> = {
      foo: false,
      bar: true,
      baz: false,
      fez: true,
    };

    const encodedData = encode(sampleData, flattenSchema(schema));

    expect(encodedData.toUint8Array()).toEqual(new Uint8Array([0b0000_1010]));
  });
  test("Encode nested object", () => {
    const schema = z.object({
      foo: z.object({
        bar: z.object({
          baz: z.string(),
        }),
      }),
      fez: z.string(),
    });

    const sampleData: z.infer<typeof schema> = {
      foo: {
        bar: {
          baz: "test",
        },
      },
      fez: "epic",
    };

    const encodedData = encode(
      sampleData,
      flattenSchema(schema)
    ).toUint8Array();

    expect(encodedData).toEqual(
      new Uint8Array([
        116, 101, 115, 116, 0b0000_0000, 101, 112, 105, 99, 0b0000_0000,
      ])
    );
  });

  test("Encode discriminated value", () => {
    const schema = z.union([z.number(), z.string()]);

    const sampleCase1: z.infer<typeof schema> = "Epic";
    const encodedData1 = encode(
      sampleCase1,
      flattenSchema(schema)
    ).toUint8Array();

    expect(encodedData1).toEqual(new Uint8Array([138, 224, 210, 198, 0, 0]));

    const sampleCase2: z.infer<typeof schema> = 69;
    const encodedData2 = encode(sampleCase2, flattenSchema(schema)).buff;

    expect(encodedData2).toEqual([0b10001010, 0b0]);
  });

  test("Encode optional property", () => {
    const schema = z.object({
      test: z.string().optional(),
    });

    const populatedCase: z.infer<typeof schema> = {
      test: "epic",
    };

    const unpopulatedCase: z.infer<typeof schema> = {};

    const encodedPopulatedCase = encode(
      populatedCase,
      flattenSchema(schema)
    ).buff;

    expect(encodedPopulatedCase).toEqual([
      0b11001010, 0b11100000, 0b11010010, 0b11000110, 0b00000000, 0b00000000,
    ]);

    const encodedUnpopulatedCase = encode(
      unpopulatedCase,
      flattenSchema(schema)
    ).buff;

    expect(encodedUnpopulatedCase).toEqual([0b0000_0000]);
  });

  test("Encode nullable property", () => {
    const schema = z.object({
      test: z.string().nullable(),
    });

    const populatedCase: z.infer<typeof schema> = {
      test: "epic",
    };

    const unpopulatedCase: z.infer<typeof schema> = { test: null };

    const encodedPopulatedCase = encode(
      populatedCase,
      flattenSchema(schema)
    ).buff;

    expect(encodedPopulatedCase).toEqual([
      0b11001010, 0b11100000, 0b11010010, 0b11000110, 0b00000000, 0b00000000,
    ]);

    const encodedUnpopulatedCase = encode(
      unpopulatedCase,
      flattenSchema(schema)
    ).buff;

    expect(encodedUnpopulatedCase).toEqual([0b0000_0000]);
  });
});
