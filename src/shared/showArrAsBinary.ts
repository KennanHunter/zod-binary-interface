export const showArrAsBinary = (arr: number[]): string =>
  arr.map((cur) => "0b" + cur.toString(2).padStart(8, "0")).join(", ");
