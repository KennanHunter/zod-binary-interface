import { ReadableBuffer } from "./decode/readableBuffer";
import { MutableBuffer } from "./encode/mutableBuffer";

describe("Buffer interchange", () => {
  test("write and read back", () => {
    const data = [0xff, 0x00, 0x88];

    const write = new MutableBuffer();

    write.pushBytes(data);

    expect(write.buff).toHaveLength(3);
    expect(write.toUint8Array()).toEqual(new Uint8Array(data));

    const read = new ReadableBuffer(write.toUint8Array());

    const readData = read.readBytes(3);

    expect(readData).toHaveLength(3);
    expect(readData).toEqual(data);
  });

  test("write and read back string data with arbitrary bit", () => {
    const data = new TextEncoder().encode("Test string");

    const write = new MutableBuffer();

    write.pushBytes(data);

    expect(write.buff).toHaveLength(11);
    expect(write.toUint8Array()).toEqual(new Uint8Array(data));

    write.pushBit(true);
    expect(write.buff).toHaveLength(12);
    expect(write.currentBit).toEqual(89);

    const read = new ReadableBuffer(write.toUint8Array());

    const readData = new Uint8Array(read.readBytes(11));

    expect(readData).toHaveLength(11);
    expect(readData).toEqual(data);
    expect(new TextDecoder().decode(readData)).toEqual("Test string");

    const readBit = read.readBit();
    expect(readBit).toEqual(true);
  });
});
