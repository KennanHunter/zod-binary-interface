import { z } from "zod";
import { blockDecodeResultsToObject } from "./decode/blockDecodeResultsToObject";
import { decode } from "./decode/decode";
import { encode } from "./encode/encode";
import { Block } from "./shared/block";
import { flattenSchema } from "./shared/flatten";
import { SerializableSchema } from "./shared/serializableSchemaTypes";

export const ZodBinaryInterface = {
  fromSchema: <TSchema extends SerializableSchema>(schema: TSchema) =>
    ZodBinaryInterfaceInstance(schema, flattenSchema(schema)),
};

const ZodBinaryInterfaceInstance = <TSchema extends z.Schema>(
  schema: TSchema,
  blocks: Block[]
) => ({
  decode: (arrBuf: ArrayBuffer): z.infer<TSchema> => {
    const data = new Uint8Array(arrBuf);

    const decodeResults = decode(data, blocks);

    const obj = blockDecodeResultsToObject(decodeResults);

    return schema.parse(obj);
  },
  encode: (data: z.infer<TSchema>): ArrayBuffer => {
    schema.parse(data);

    const encodedData = encode(data, blocks);

    return encodedData.buffer;
  },
});
