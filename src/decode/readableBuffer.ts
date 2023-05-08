import { concatenateUint8 } from "../shared/arrayUtils";

export const ReadableBuffer = class {
  buff: Uint8Array;
  currentBit = 0;

  constructor(buff: Uint8Array) {
    this.buff = buff;
  }

  readBytes = (length = 1): Uint8Array => {
    const buffer = new Uint8Array(length);

    buffer.forEach((_, index) => {
      for (let bit = 0; bit < 8; bit++) {
        buffer[index] =
          buffer[index] + ((this.readBit() ? 1 : 0) << this.currentBit);
      }
    });

    return buffer;
  };

  readBit = (): boolean => {
    let targetByte = Math.floor(this.currentBit / 8);

    if (targetByte === this.buff.length) {
      this.buff = concatenateUint8(this.buff, new Uint8Array(1));
    }

    const bit = this.buff[targetByte] & (1 << (7 - (this.currentBit % 8)));

    this.currentBit += 1;

    return bit > 0;
  };
};
