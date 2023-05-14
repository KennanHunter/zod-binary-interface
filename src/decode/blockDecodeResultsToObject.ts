import { PathUtils } from "../shared/path";
import { BlockDecodeResult } from "./decode";

export const blockDecodeResultsToObject = (
  blocks: BlockDecodeResult[]
): unknown =>
  blocks.reduce(
    (prev, cur) => PathUtils.setValueWithPath(prev, cur.path, cur.value),
    {} as Record<string, unknown>
  );
