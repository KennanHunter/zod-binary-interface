export const sameStringified = <T = undefined>(first: T, second: T) =>
  expect(JSON.stringify(first)).toEqual(JSON.stringify(second));
