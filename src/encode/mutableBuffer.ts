import { concatenateUint8 } from "../shared/arrayUtils";

export const MutableBuffer = class {
  buff: Uint8Array;
  currentBit = 0;

  constructor() {
    this.buff = new Uint8Array();
  }

  pushBytes = (...push: Uint8Array[]): void => {
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
      this.buff = concatenateUint8(this.buff, new Uint8Array(1));
    }

    if (bit) {
      this.buff[targetByte] =
        this.buff[targetByte] | (1 << this.currentBit % 8);
    }

    this.currentBit += 1;
  };
};
