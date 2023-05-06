import { Block } from "./block";
import { z } from "zod";
import { flattenSchema } from "./flatten";
import { SerializableSchema } from "./serializableSchemaTypes";
import { decode } from "./decode";
import { blockResultsToObject } from "./blockDecodeResultToObject";
import { encode } from "./encode";

export const ZodBinaryInterface = {
  fromSchema: <TSchema extends SerializableSchema>(schema: TSchema) =>
    ZONInstance(schema, flattenSchema(schema)),
};

const ZONInstance = <TSchema extends z.Schema>(
  schema: TSchema,
  blocks: Block[]
) => ({
  decode: (arrBuf: ArrayBuffer): z.infer<TSchema> => {
    const data = new Uint8Array(arrBuf);

    const decodeResults = decode(data, blocks);

    const obj = blockResultsToObject(decodeResults);

    return schema.parse(obj);
  },
  encode: (data: z.infer<TSchema>): ArrayBuffer => {
    schema.parse(data);

    const encodedData = encode(data, blocks);

    return encodedData.buffer;
  },
});
