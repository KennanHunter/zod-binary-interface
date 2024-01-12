import { z } from "zod";

export const paperData = {
  key: "string value",
  "non-string-data": 5,
};

export const paperDataSchema = z.object({
  key: z.string(),
  "non-string-data": z.number(),
});
