import { Block } from "../shared/block";
import { PathUtils } from "../shared/path";
import { MutableBuffer } from "./mutableBuffer";

export const encode = (data: any, blocks: Block[]): Uint8Array => {
  let buffer = new MutableBuffer();

  blocks.forEach((block): void => {
    if (block.block === "discriminator") {
      const bitLength = Math.floor(Math.log2(block.options.length)) + 1;

      for (const _ in new Array(bitLength)) {
        buffer.pushBit(false);
      }

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
  });

  return buffer.toUint8Array();
};
