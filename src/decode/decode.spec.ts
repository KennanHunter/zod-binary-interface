import { z } from "zod";
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
});
