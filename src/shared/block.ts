import { ZodTypeAny } from "zod";
import { Path } from "./path";

export type Block = ContentBlock | DiscriminatorBlock;

type SimpleContentBlockType =
  | "string"
  | "number"
  | "boolean"
  | "undefined"
  | "null";

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

export type DiscriminatorBlock = {
  block: "discriminator";
  // TODO
  path: Path;
  options: Block[][];
  discriminate: readonly ZodTypeAny[];
};
