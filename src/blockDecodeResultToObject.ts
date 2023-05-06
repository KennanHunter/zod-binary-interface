import { BlockDecodeResult } from "./decode";
import { PathUtils } from "./path";

export const blockResultsToObject = (blocks: BlockDecodeResult[]): unknown =>
  blocks.reduce((prev, cur) => {
    return PathUtils.setValueWithPath(prev, cur.path, cur.value);
  }, {} as Record<string, unknown>);
