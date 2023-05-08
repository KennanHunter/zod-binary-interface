import { z } from "zod";
import { ZodBinaryInterface } from ".";

const sampleSchema = () =>
  z.object({
    sampleString: z.string(),
  });

describe("Final Parse", () => {
  test("Serialize returns an ArrayBuffer", () => {
    const zbi = ZodBinaryInterface.fromSchema(sampleSchema());

    expect(zbi.encode({ sampleString: "epic" })).toBeInstanceOf(ArrayBuffer);
  });
});
