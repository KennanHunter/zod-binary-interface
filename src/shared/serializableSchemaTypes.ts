import { z } from "zod";

type SerializableDef =
  | z.ZodStringDef
  | z.ZodOptionalDef
  | z.ZodObjectDef
  | z.ZodNumberDef
  | z.ZodBooleanDef
  | z.ZodArrayDef
  | z.ZodNeverDef
  | z.ZodUnionDef;

export type SerializableSchema = z.Schema<any, SerializableDef>;
