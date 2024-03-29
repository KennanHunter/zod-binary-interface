import { ReadableBuffer } from "./readableBuffer";

const exampleBuffer = () =>
  new ReadableBuffer(new Uint8Array([0b0000_0010, 0xff]));

describe("Readable Buffer", () => {
  test("Instantiate", () => {
    const buffer = new ReadableBuffer(new Uint8Array());

    expect(buffer).toBeInstanceOf(ReadableBuffer);
    expect(buffer.currentBit).toBe(0);
    expect(buffer.buff).toBeInstanceOf(Uint8Array);
  });

  test("Read bytes", () => {
    const buffer = exampleBuffer();

    const data = buffer.readBytes(1);

    expect(data).toHaveLength(1);
    expect(data.at(0)).toEqual(0b0000_0010);
    expect(buffer.currentBit).toBe(8);
  });

  test("Read bits", () => {
    const buffer = exampleBuffer();

    const toBeFalse = buffer.readBit();
    const toBeTrue = buffer.readBit();

    expect(buffer.currentBit).toBe(2);
    expect(toBeFalse).toBe(false);
    expect(toBeTrue).toBe(true);
  });

  test("Read bytes from offset", () => {
    const buffer = new ReadableBuffer(
      new Uint8Array([0b1111_1110, 0b00000_0001])
    );

    buffer.readBit();
    const data = buffer.readBytes(1);

    expect(data).toHaveLength(1);
    expect(data.at(0)).toEqual(0b1111_1111);
    expect(buffer.currentBit).toBe(9);
  });
});
