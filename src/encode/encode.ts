import { concatenateUint8 } from "../shared/arrayUtils";
import { Block } from "../shared/block";
import { PathUtils } from "../shared/path";

export const encode = (data: any, blocks: Block[]): Uint8Array => {
  let buffer = new Uint8Array();

  const currentBit = 0;
  const pushToBuffer = (...push: Uint8Array[]): Uint8Array => {
    if (currentBit % 8 === 0) {
      buffer = concatenateUint8(buffer, ...push);
      return buffer;
    }

    return "" as any;
  };

  blocks.forEach((block) => {
    if (block.block === "discriminator") return;

    if (block.type === "string") {
      const encodedString = new TextEncoder().encode(
        PathUtils.extractPathFromObject(data, block.path)
      );

      // append null character to end of text encoding
      pushToBuffer(encodedString, new Uint8Array([0b0000_0000]));
    }
  });

  return buffer;
};
