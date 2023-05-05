export const decode = (data: Uint8Array, blocks: Block[]): unknown => {
  let curBit: number = 0;

  const curByte = () => Math.floor(curBit / data.BYTES_PER_ELEMENT);
  const getData = (startingBit: number, length: number) => {
    if (
      length % data.BYTES_PER_ELEMENT === 0 &&
      startingBit % data.BYTES_PER_ELEMENT === 0
    ) {
      return data.subarray(
        startingBit / data.BYTES_PER_ELEMENT,
        length / data.BYTES_PER_ELEMENT
      );
    }
  };

  return blocks.map((block): undefined | { path: string[]; value: any } => {
    if (block.block === "discriminator") return;

    if (block.type === "number") {
      const numData = getData(curBit, 8)?.at(0);

      if (!numData) return;

      return { path: [], value: numData };
    }
  });
};
