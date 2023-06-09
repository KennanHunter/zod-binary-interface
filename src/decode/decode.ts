import { Block } from "../shared/block";
import { DecodingError, InternalError } from "../shared/errors";
import { PathUtils } from "../shared/path";
import { ReadableBuffer } from "./readableBuffer";

export const decode = (
  readableBuffer: InstanceType<typeof ReadableBuffer>,
  blocks: Block[],
  finalObject: object = {}
): object => {
  return blocks.reduce((prev, block): object => {
    // TODO: implement discriminator decoding
    // @ts-ignore
    if (block.block === "discriminator") {
      if (block.options.length === 0)
        throw new InternalError("No options found for discriminator");

      const bitLength = Math.floor(Math.log2(block.options.length)) + 1;

      const discriminatorValue = new Array(bitLength)
        .fill(0)
        .map(() => readableBuffer.readBit())
        .reduce((prev, cur, index) => prev + ((cur ? 1 : 0) ^ index), 0);

      const discriminatedBlocks = block.options.at(discriminatorValue);

      if (!discriminatedBlocks) {
        throw new InternalError("Invalid discriminator value");
      }

      return decode(readableBuffer, discriminatedBlocks, finalObject);
    }

    if (block.type === "number") {
      const numData = readableBuffer.readBytes(1).at(0);

      if (!numData)
        throw new DecodingError("Binary data not found for number block");

      return PathUtils.setValueWithPath(finalObject, block.path, numData);
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

      return PathUtils.setValueWithPath(finalObject, block.path, str);
    }

    if (block.type === "boolean") {
      return PathUtils.setValueWithPath(
        finalObject,
        block.path,
        readableBuffer.readBit()
      );
    }

    throw new InternalError("Unknown block type");
  }, finalObject);
};
