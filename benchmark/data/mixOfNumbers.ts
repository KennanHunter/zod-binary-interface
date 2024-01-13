import { z } from "zod";

export const mixOfNumbersData: z.infer<typeof mixOfNumbersSchema> = {
  epic: 42069,
  d: "Lorem ipsum dolar sit amet",
  f: 42069,
  a: "Sean is a cool person thank him for helping me with this",
  h: 42069,
  epic6: "Gaming so hard right now",
};

export const mixOfNumbersSchema = z.object({
  epic: z.number(),
  d: z.string(),
  f: z.number(),
  a: z.string(),
  h: z.number(),
  epic6: z.string(),
});
