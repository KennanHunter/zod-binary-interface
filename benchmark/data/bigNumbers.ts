import { z } from "zod";

export const numbersData = {
  epic: 42069,
  epic2: 42069,
  epic3: 42069,
  epic4: 42069,
  epic5: 42069,
  epic6: 42069,
};

export const numbersSchema = z.object({
  epic: z.number(),
  epic2: z.number(),
  epic3: z.number(),
  epic4: z.number(),
  epic5: z.number(),
  epic6: z.number(),
});
