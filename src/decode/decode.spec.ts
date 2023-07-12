import { Schema, z } from "zod";
import { flattenSchema } from "../shared/flatten";
import { decode } from "./decode";
import { ReadableBuffer } from "./readableBuffer";

describe("data decoding", () => {
  test("simple number", () => {
    const schema = z.number();

    const mockData = new Uint8Array(1);
    mockData.set([69]);

    const readableBuffer = new ReadableBuffer(mockData);

    const decodedData = decode(readableBuffer, flattenSchema(schema));

    expect(decodedData).toEqual(69);
    expect(schema.safeParse(decodedData).success);
  });

  test("multiple booleans", () => {
    const schema = z.object({
      foo: z.boolean(),
      bar: z.boolean(),
      baz: z.boolean(),
      fez: z.boolean(),
    });

    const mockData = new Uint8Array([0b0000_1010]);

    const readableBuffer = new ReadableBuffer(mockData);

    const decodedData = decode(readableBuffer, flattenSchema(schema));

    expect(schema.safeParse(decodedData).success);
    expect(decodedData).toEqual({
      foo: false,
      bar: true,
      baz: false,
      fez: true,
    } as z.infer<typeof schema>);
  });

  test("simple number and short string", () => {
    const schema = z.object({
      num: z.number(),
      str: z.string(),
    });

    const mockData = new Uint8Array([
      // 69, "H", "i", null terminator
      0b01000101, 0b0100_1000, 0b01101001, 0b0000_0000,
    ]);

    const readableBuffer = new ReadableBuffer(mockData);

    const decodedData = decode(readableBuffer, flattenSchema(schema));

    expect(decodedData).toEqual({
      num: 69,
      str: "Hi",
    });
    expect(schema.safeParse(decodedData).success);
  });

  test("decode basic discriminator", () => {
    const schema = z.union([z.number(), z.string()]);

    const encodedCase1 = new Uint8Array([138, 224, 210, 198, 0, 0]);

    const decodedCase1 = decode(
      new ReadableBuffer(encodedCase1),
      flattenSchema(schema)
    );

    expect(decodedCase1).toEqual<z.infer<typeof schema>>("Epic");

    const encodedCase2 = new Uint8Array([0b10001010, 0b0]);

    const decodedCase2 = decode(
      new ReadableBuffer(encodedCase2),
      flattenSchema(schema)
    );

    expect(decodedCase2).toEqual<z.infer<typeof schema>>(69);
  });

  test("Decode optional property", () => {
    const schema = z.object({
      test: z.string().optional(),
    });

    const populatedCase = new ReadableBuffer(
      new Uint8Array([
        0b11001010, 0b11100000, 0b11010010, 0b11000110, 0b00000000, 0b00000000,
      ])
    );

    const decodedPopulatedCase = decode(populatedCase, flattenSchema(schema));

    console.log(JSON.stringify(decodedPopulatedCase, null, 4));

    expect(schema.safeParse(decodedPopulatedCase).success).toEqual(true);

    expect(decodedPopulatedCase).toEqual<z.infer<typeof schema>>({
      test: "epic",
    });

    const unpopulatedCase = new ReadableBuffer(new Uint8Array([0b0000_0000]));

    const decodedUnpopulatedCase = decode(
      unpopulatedCase,
      flattenSchema(schema)
    );

    expect(schema.safeParse(decodedUnpopulatedCase).success).toBe(true);
    expect<z.infer<typeof schema>>(decodedUnpopulatedCase).toEqual({});

    expect(decodedUnpopulatedCase).toEqual([0b0000_0000]);
  });
});
