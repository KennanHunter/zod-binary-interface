import { Path } from "./path";

export type Block = ContentBlock | DiscriminatorBlock;

type SimpleContentBlockType = "string" | "number" | "boolean";

type SimpleContentBlock = {
  block: "content";
  type: SimpleContentBlockType;
  path: Path;
};

type ArrayContentBlock = {
  block: "content";
  type: "array";
  innerBlocks: Block[];
  path: Path;
};

export type ContentBlock = SimpleContentBlock | ArrayContentBlock;

type DiscriminatorBlock = {
  block: "discriminator";
  // TODO
  options: {
    [key: string]: ContentBlock[];
  };
};