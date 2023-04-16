import { ZON } from ".";
import { z } from "zod";

const sampleSchema = () =>
  z.object({
    sampleString: z.string(),
  });

describe("Final Parse", () => {
  test("Serialize returns an ArrayBuffer", () => {
    const zon = ZON.fromSchema(sampleSchema());

    expect(zon.serialize({ sampleString: "epic" })).toBeInstanceOf(ArrayBuffer);
  });
});
