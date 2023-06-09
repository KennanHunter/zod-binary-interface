import { ReadableBuffer } from "./decode/readableBuffer";
import { MutableBuffer } from "./encode/mutableBuffer";

describe("Buffer interchange", () => {
  test("write and read back", () => {
    const data = new Uint8Array([0xff, 0x00, 0x88]);

    const write = new MutableBuffer();

    write.pushBytes(data);

    expect(write.buff).toHaveLength(3);
    expect(write.toUint8Array()).toEqual(data);

    const read = new ReadableBuffer(write.toUint8Array());

    const readData = read.readBytes(3);

    expect(readData).toHaveLength(3);
    expect(readData).toEqual(data);
  });
});
