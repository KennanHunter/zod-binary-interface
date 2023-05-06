import { ZodBinaryInterface } from ".";
import { z } from "zod";

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
