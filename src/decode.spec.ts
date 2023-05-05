import { z } from "zod";
import { decode } from "./decode";
import { flattenSchema } from "./flatten";

describe("data decoding", () => {
  test("simple number", () => {
    const schema = z.number();

    const mockData = new Uint8Array(1);
    mockData.set([69]);

    const decodedData = decode(mockData, flattenSchema(schema));

    // expect(() => schema.parse(decodedData)).toReturn();
    expect(decodedData).toEqual([{ path: [], value: 69 }]);
  });
});
