import { Block } from "../shared/block";
import { PathUtils } from "../shared/path";
import { MutableBuffer } from "./mutableBuffer";

export const encode = (
  data: any,
  blocks: Block[],
  buffer = new MutableBuffer()
): InstanceType<typeof MutableBuffer> => {
  blocks.forEach((block): void => {
    if (block.block === "discriminator") {
      // const bitLength = Math.floor(Math.log2(block.options.length)) + 1;

      const blockValue = PathUtils.extractPathFromObject(data, block.path);
      const selectedOptionIndex = block.discriminate.findIndex(
        (val) => val.safeParse(blockValue).success
      );

      for (const bit in selectedOptionIndex.toString(2).split("")) {
        buffer.pushBit(bit === "1" ? true : false);
      }

      const selectedOptionBlocks = block.options[selectedOptionIndex];

      encode(blockValue, selectedOptionBlocks, buffer);

      return;
    }

    if (block.type === "string") {
      const encodedString = new TextEncoder().encode(
        PathUtils.extractPathFromObject(data, block.path)
      );

      // append null character to end of text encoding
      buffer.pushBytes(encodedString, [0b0000_0000]);
    }

    if (block.type === "boolean") {
      const bool = PathUtils.extractPathFromObject(data, block.path) as boolean;

      buffer.pushBit(bool);
    }

    if (block.type === "number") {
      const value: number = PathUtils.extractPathFromObject(data, block.path);

      buffer.pushBytes([value]);
    }
  });

  return buffer;
};
