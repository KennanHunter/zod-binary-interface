import { z } from "zod";
import { flattenSchema } from "../shared/flatten";
import { blockDecodeResultsToObject } from "./blockDecodeResultsToObject";
import { decode } from "./decode";

describe("data decoding", () => {
  test("simple number", () => {
    const schema = z.number();

    const mockData = new Uint8Array(1);
    mockData.set([69]);

    const decodedData = decode(mockData, flattenSchema(schema));

    expect(() => schema.parse(decodedData[0].value));
    expect(decodedData).toEqual([{ path: [], value: 69 }]);

    const finalValue = blockDecodeResultsToObject(decodedData);

    expect(finalValue).toEqual(69);
    expect(schema.safeParse(finalValue).success);
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

    const decodedData = decode(mockData, flattenSchema(schema));

    expect(decodedData).toEqual([
      { path: ["num"], value: 69 },
      { path: ["str"], value: "Hi" },
    ]);

    const finalValue = blockDecodeResultsToObject(decodedData);

    expect(finalValue).toEqual({
      num: 69,
      str: "Hi",
    });
    expect(schema.safeParse(finalValue).success);
  });
});
