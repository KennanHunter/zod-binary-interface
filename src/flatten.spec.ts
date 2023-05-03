import { z } from "zod";
import { flattenSchema } from "./flatten";

describe("schema flattening", () => {
  test("Flatten", (a) => {
    flattenSchema(z.never());
    
    expect(false).toBeTruthy()
  });
});
