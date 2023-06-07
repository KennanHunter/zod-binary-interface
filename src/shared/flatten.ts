import { ZodTypeAny, z } from "zod";
import { Block } from "./block";
import { Path } from "./path";
import { SerializableSchema } from "./serializableSchemaTypes";

export const flattenSchema = (
  schema: SerializableSchema,
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
      options: schema._def.options.map((option) =>
        flattenSchema(option, [], [])
      ),
      discriminate: schema._def.options as readonly ZodTypeAny[],
      path,
    });
  }

  if (schema._def.typeName === z.ZodFirstPartyTypeKind.ZodOptional) {
    blocks.push({
      block: "discriminator",
      options: [
        flattenSchema(schema._def.innerType, [], []),
        [
          {
            block: "content",
            type: "undefined",
            path,
          },
        ],
      ],
      discriminate: [schema._def.innerType, z.undefined()],
      path,
    });
  }

  if (schema._def.typeName === z.ZodFirstPartyTypeKind.ZodNullable) {
    blocks.push({
      block: "discriminator",
      options: [
        flattenSchema(schema._def.innerType, [], []),
        [
          {
            block: "content",
            type: "null",
            path,
          },
        ],
      ],
      discriminate: [schema._def.innerType, z.null()],
      path,
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
      innerBlocks: flattenSchema(schema._def.type, [], path),
      path,
    });
  }

  return blocks;
};
