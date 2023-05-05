type Block = ContentBlock | DiscriminatorBlock;

type SimpleContentBlockType = "string" | "number" | "boolean";

type SimpleContentBlock = { block: "content"; type: SimpleContentBlockType };
type ArrayContentBlock = {
  block: "content";
  type: "array";
  innerBlocks: Block[];
};

type ContentBlock = SimpleContentBlock | ArrayContentBlock;

type DiscriminatorBlock = {
  block: "discriminator";
  // TODO
  options: {
    [key: string]: ContentBlock[];
  };
};
