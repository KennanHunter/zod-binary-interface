import { z } from "zod";

type SerializableDef =
  | z.ZodArrayDef
  | z.ZodBooleanDef
  | z.ZodNeverDef
  | z.ZodNullableDef
  | z.ZodNumberDef
  | z.ZodObjectDef
  | z.ZodOptionalDef
  | z.ZodStringDef
  | z.ZodUnionDef;

export type SerializableSchema = z.Schema<any, SerializableDef>;
