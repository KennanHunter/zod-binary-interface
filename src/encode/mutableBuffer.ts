export const MutableBuffer = class {
  buff: number[];
  currentBit = 0;

  constructor() {
    this.buff = new Array();
  }

  pushBytes = (...push: (number[] | Uint8Array)[]): void => {
    for (let array of push) {
      for (let byte of array) {
        for (let bit = 0; bit < 8; bit++) {
          this.pushBit(((byte >>> bit) & 1) != 0);
        }
      }
    }
  };

  pushBit = (bit: boolean): void => {
    let targetByte = Math.floor(this.currentBit / 8);

    if (targetByte === this.buff.length) {
      this.buff.push(0b0000_0000);
    }

    if (bit) {
      this.buff[targetByte] =
        this.buff[targetByte] | (1 << this.currentBit % 8);
    }

    this.currentBit += 1;
  };

  toUint8Array = (): Uint8Array => new Uint8Array(this.buff);
};
