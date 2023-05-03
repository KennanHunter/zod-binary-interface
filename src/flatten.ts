import { z } from "zod";

export const flattenSchema = <TSchema extends z.Schema>(schema: TSchema) => {
  const testObject = z.object({
    epic: z.string(),
  });

  if (typeof testObject._type === "string") {
    
  }

  if (typeof testObject._type === "object") {
    for (const property in testObject._type) {
      console.log(testObject._type[property]);
    }
  }
};

flattenSchema(z.never());
