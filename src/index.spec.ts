import { z } from "zod";
import { ZodBinaryInterface } from ".";

const sampleSchema = () =>
  z.object({
    sampleString: z.string(),
    sampleBoolean: z.boolean(),
  });

const sampleData: z.infer<ReturnType<typeof sampleSchema>> = {
  sampleString: "epic",
  sampleBoolean: false,
};

describe("Final Parse", () => {
  test("Big boy test", () => {
    const zbi = ZodBinaryInterface.fromSchema(sampleSchema());

    const buffer = zbi.encode(sampleData);

    expect(buffer).toBeInstanceOf(ArrayBuffer);

    const decodedData = zbi.decode(buffer);

    expect(sampleSchema().safeParse(decodedData).success).toBe(true);
    expect(decodedData).toEqual(sampleData);
  });
});
