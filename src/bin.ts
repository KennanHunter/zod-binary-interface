import { z } from "zod";
import { flattenSchema } from "./flatten";

flattenSchema(
  z.object({
    epic: z.string(),
    foo: z.number(),
  })
);
