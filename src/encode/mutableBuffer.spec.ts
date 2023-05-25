import { MutableBuffer } from "./mutableBuffer";

describe("Mutable buffer", () => {
  test("Instantiate", () => {
    const buffer = new MutableBuffer();

    expect(buffer).toBeInstanceOf(MutableBuffer);
    expect(buffer.currentBit).toBe(0);
    expect(buffer.buff).toBeInstanceOf(Array);
  });

  test("Push bytes", () => {
    const buffer = new MutableBuffer();

    buffer.pushBytes([0xff, 0x12, 0x15]);
    buffer.pushBytes([0x4f, 0x52, 0x55]);

    expect(buffer.buff).toHaveLength(6);
    expect(buffer.currentBit).toBe(48);
  });

  test("Push bits", () => {
    const buffer = new MutableBuffer();

    buffer.pushBit(true);
    buffer.pushBit(false);

    expect(buffer.buff).toHaveLength(1);
    expect(buffer.currentBit).toBe(2);
  });
});
