import { z } from "zod";
import { SerializableSchema } from "./serializableSchemaTypes";

export const encode = <TSchema extends SerializableSchema>(
  data: z.infer<TSchema>,
  blocks: Block[]
): Uint8Array => {
  const buffer = new Uint8Array();

  blocks.forEach((block) => {
    if (block.block === "discriminator") return;
  });

  return buffer;
};
