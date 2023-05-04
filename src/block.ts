type Block = ContentBlock | DiscriminatorBlock;

type ContentBlock = unknown;

type DiscriminatorBlock = {
  [key: string]: ContentBlock[];
};
