export type Path = string[];

export const PathUtils = {
  addPathToObject: <T extends Record<string, any>>(
    obj: T,
    pathArray: string[],
    value: any
  ): T => {
    let current: any = obj;

    if (pathArray.length === 0) return value;

    for (let i = 0; i < pathArray.length - 1; i++) {
      const pathSegment = pathArray[i];
      if (!current[pathSegment]) {
        current[pathSegment] = {};
      }
      current = current[pathSegment];
    }

    current[pathArray[pathArray.length - 1]] = value;

    return obj;
  },
};
