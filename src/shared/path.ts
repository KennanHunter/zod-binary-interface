export type Path = string[];

export const PathUtils = {
  setValueWithPath: <T extends Record<string, any>>(
    obj: T,
    pathArray: string[],
    value: any
  ): T => {
    let current: any = obj;

    if (pathArray.length === 0) return value;

    pathArray.slice(0, -1).forEach((pathSegment) => {
      if (!current[pathSegment]) {
        current[pathSegment] = {};
      }

      current = current[pathSegment];
    });

    const finalSegment = pathArray.at(-1);

    if (!finalSegment) throw new InternalError("Final path segment not found");

    current[finalSegment] = value;

    return obj;
  },
  extractPathFromObject: <T = unknown>(obj: any, pathArray: string[]): T => {
    if (pathArray.length === 0) return obj;

    return pathArray.reduce((prev, cur) => prev[cur], obj);
  },
};
