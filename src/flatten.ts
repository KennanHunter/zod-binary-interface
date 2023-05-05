import { z } from "zod";

type PossibleDefs =
  | z.ZodStringDef
  | z.ZodOptionalDef
  | z.ZodObjectDef
  | z.ZodNumberDef
  | z.ZodBooleanDef
  | z.ZodArrayDef
  | z.ZodNeverDef;

export const flattenSchema = <TSchema extends z.Schema<any, PossibleDefs>>(
  val: TSchema
) => {
  const schema: TSchema = z.object({
    epic: z.string(),
  }) as any;

  console.log("flattening schema");
  console.dir(schema);
  console.log(typeof schema);

  if (schema._def.typeName === z.ZodFirstPartyTypeKind.ZodNever) {
    return;
  } else if (schema._def.typeName === z.ZodFirstPartyTypeKind.ZodObject) {
    Object.entries(schema._def.shape()).map(([property, value]) =>
      flattenSchema(value)
    );

    schema._def.shape;
  } else if (schema._def.typeName === z.ZodFirstPartyTypeKind.ZodOptional) {
    flattenSchema(schema._def.innerType);
  } else if (schema._def.typeName === z.ZodFirstPartyTypeKind.ZodString) {
  } else if (schema._def.typeName === z.ZodFirstPartyTypeKind.ZodNumber) {
  } else if (schema._def.typeName === z.ZodFirstPartyTypeKind.ZodBoolean) {
  } else if (schema._def.typeName === z.ZodFirstPartyTypeKind.ZodArray) {
    schema._def.type;
  } else {
  }
};
