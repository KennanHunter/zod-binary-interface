import { Block } from "../shared/block";
import { Path } from "../shared/path";
import { ReadableBuffer } from "./readableBuffer";

export type BlockDecodeResult = { path: Path; value: unknown };

export const decode = (
  data: Uint8Array,
  blocks: Block[]
): BlockDecodeResult[] => {
  const readableBuffer = new ReadableBuffer(data);

  return blocks.map((block): BlockDecodeResult => {
    // TODO: implement discriminator decoding
    // @ts-ignore
    if (block.block === "discriminator") return;

    if (block.type === "number") {
      const numData = readableBuffer.readBytes(1).at(0);

      if (!numData)
        throw new DecodingError("Binary data not found for number block");

      return { path: block.path, value: numData };
    }

    if (block.type === "string") {
      const bitAtStringStart = readableBuffer.currentBit;

      const restOfData = readableBuffer.readBytes(
        readableBuffer.buff.length * 8 - readableBuffer.currentBit
      );

      if (!restOfData)
        throw new DecodingError("Binary data not found for string block");

      let index = 0;
      for (const value of restOfData) {
        if (value === 0b00000000) {
          break;
        }
        index += 1;
      }

      readableBuffer.setCurrentBit(bitAtStringStart);
      const stringData = readableBuffer.readBytes(index);

      const str = new TextDecoder().decode(stringData);

      return {
        path: block.path,
        value: str,
      };
    }

    if (block.type === "boolean") {
      return { path: block.path, value: readableBuffer.readBit() };
    }

    throw new InternalError("Unknown block type");
  });
};
