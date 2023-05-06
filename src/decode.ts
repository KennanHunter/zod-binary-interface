type BlockDecodeResult = { path: string[]; value: any };
export const decode = (data: Uint8Array, blocks: Block[]): unknown => {
  const BITS_PER_ELEMENT = data.BYTES_PER_ELEMENT * 8;

  let curBit: number = 0;

  const curByte = () => Math.floor(curBit / BITS_PER_ELEMENT);
  const getData = (startingBit: number, length: number) => {
    if (
      length % BITS_PER_ELEMENT === 0 &&
      startingBit % BITS_PER_ELEMENT === 0
    ) {
      return data.subarray(
        startingBit / BITS_PER_ELEMENT,
        startingBit / BITS_PER_ELEMENT + length / BITS_PER_ELEMENT
      );
    }
  };

  return blocks.map((block): undefined | BlockDecodeResult => {
    if (block.block === "discriminator") return;

    if (block.type === "number") {
      const numData = getData(curBit, 8)?.at(0);
      curBit += 8;

      if (!numData) return;

      return { path: [], value: numData };
    }

    if (block.type === "string") {
      const restOfData = getData(
        curBit,
        // get subarray of rest of stream
        data.length * BITS_PER_ELEMENT - curBit
      );

      if (!restOfData) return;

      let index = 0;
      for (const value of restOfData) {
        if (value === 0b00000000) {
          break;
        }
        index += 1;
      }

      const stringData = getData(curBit, index * BITS_PER_ELEMENT);

      const str = new TextDecoder().decode(stringData);

      curBit += (index + 1) * BITS_PER_ELEMENT;

      return {
        path: [],
        value: str,
      };
    }
  });
};
