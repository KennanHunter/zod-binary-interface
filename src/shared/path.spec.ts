import { PathUtils } from "./path";

describe("path utils", () => {
  test("Extract value", () => {
    const value = PathUtils.extractPathFromObject(
      {
        foo: {
          bar: {
            baz: "value",
          },
        },
        bad: {
          bad: {
            bad: "bad",
          },
        },
      },
      ["foo", "bar", "baz"]
    );

    expect(value).toBe("value");
  });

  test("Modify value", () => {
    const value = PathUtils.setValueWithPath(
      {
        foo: {
          bar: {
            baz: "value",
          },
        },
        bad: {
          bad: {
            bad: "bad",
          },
        },
      },
      ["foo", "bar", "baz"],
      "newValue"
    );

    expect(value.foo.bar.baz).toBe("newValue");
  });
  test("Set value", () => {
    const value = PathUtils.setValueWithPath(
      {
        foo: {
          bar: {},
        },
        bad: {
          bad: {
            bad: "bad",
          },
        },
      },
      ["foo", "bar", "baz"],
      "newValue"
    );

    expect(
      (value as typeof value & { foo: { bar: { baz: string } } }).foo.bar.baz
    ).toBe("newValue");
  });
});
