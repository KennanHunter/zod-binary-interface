import { BlockDecodeResult } from "./decode";
import { PathUtils } from "./path";

export const blockResultToObject = (blocks: BlockDecodeResult[]): unknown =>
  blocks.reduce((prev, cur) => {
    return PathUtils.addPathToObject(prev, cur.path, cur.value);
  }, {} as Record<string, unknown>);
