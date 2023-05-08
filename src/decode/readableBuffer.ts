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

    const bit = this.buff[targetByte] & (0b0000_0001 << this.currentBit % 8);

    this.currentBit += 1;

    return bit > 0;
  };
};
