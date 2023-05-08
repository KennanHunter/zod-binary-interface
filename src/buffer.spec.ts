import { ReadableBuffer } from "./decode/readableBuffer";
import { MutableBuffer } from "./encode/mutableBuffer";

describe("Buffer interchange", () => {
  test("write and read back", () => {
    const data = new Uint8Array([0xff, 0x00, 0x88]);

    const write = new MutableBuffer();

    write.pushBytes(data);

    const read = new ReadableBuffer(write.buff);

    const readData = read.readBytes(3);

    expect(readData).toHaveLength(3);
    expect(readData).toEqual(data);
  });
});
