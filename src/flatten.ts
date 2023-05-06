import { z } from "zod";
import { SerializableSchema } from "./serializableSchemaTypes";

export const flattenSchema = <TSchema extends SerializableSchema>(
  schema: TSchema,
  blocks: Block[] = [],
  path: Path = []
): Block[] => {
  if (schema._def.typeName === z.ZodFirstPartyTypeKind.ZodObject) {
    const shape = schema._def.shape();
    for (const i in shape) {
      flattenSchema(shape[i], blocks, [...path, i]);
    }
  }

  if (schema._def.typeName === z.ZodFirstPartyTypeKind.ZodUnion) {
    blocks.push({
      block: "discriminator",
      options: {},
    });
  }

  if (schema._def.typeName === z.ZodFirstPartyTypeKind.ZodString) {
    blocks.push({
      block: "content",
      type: "string",
      path,
    });
  }

  if (schema._def.typeName === z.ZodFirstPartyTypeKind.ZodNumber) {
    blocks.push({
      block: "content",
      type: "number",
      path,
    });
  }

  if (schema._def.typeName === z.ZodFirstPartyTypeKind.ZodBoolean) {
    blocks.push({
      block: "content",
      type: "boolean",
      path,
    });
  }

  if (schema._def.typeName === z.ZodFirstPartyTypeKind.ZodArray) {
    blocks.push({
      block: "content",
      type: "array",
      innerBlocks: flattenSchema(schema._def.type),
      path,
    });
  }

  return blocks;
};
