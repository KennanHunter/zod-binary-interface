import { z } from "zod";

export const ZON = {
  fromSchema: <TSchema extends z.Schema>(schema: TSchema) =>
    ZONInstance(schema),
};

const ZONInstance = <TSchema extends z.Schema>(schema: TSchema) => ({
  parse: (): z.infer<TSchema> => {
    return schema.parse({});
  },
  serialize: (data: z.infer<TSchema>): ArrayBuffer => {
    schema.parse(data);
    return new ArrayBuffer(10);
  },
});
