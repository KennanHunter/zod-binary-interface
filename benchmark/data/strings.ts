import { z } from "zod";

export const stringsData = {
  epic: "Lorem ipsum dolor sit amet",
  epic2: "Lorem ipsum dolor sit amet",
  epic3: "Lorem ipsum dolor sit amet",
  epic4: "Lorem ipsum dolor sit amet",
  epic5: "Lorem ipsum dolor sit amet",
  epic6: "Lorem ipsum dolor sit amet",
};

export const stringsSchema = z.object({
  epic: z.string(),
  epic2: z.string(),
  epic3: z.string(),
  epic4: z.string(),
  epic5: z.string(),
  epic6: z.string(),
});
