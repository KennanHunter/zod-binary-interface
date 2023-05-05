import { z } from "zod";
import { flattenSchema } from "./flatten";

describe("schema flattening", () => {
  test("Flatten single string schema", () => {
    const blocks = flattenSchema(z.string());

    expect(blocks).toHaveLength(1);
    expect(blocks).toEqual([{ block: "content", type: "string" }] as Block[]);
  });

  test("Flatten single number schema", () => {
    const blocks = flattenSchema(z.number());

    expect(blocks).toHaveLength(1);
    expect(blocks).toEqual([{ block: "content", type: "number" }] as Block[]);
  });

  test("Flatten single boolean schema", () => {
    const blocks = flattenSchema(z.boolean());

    expect(blocks).toHaveLength(1);
    expect(blocks).toEqual([{ block: "content", type: "boolean" }] as Block[]);
  });

  test("Flatten simple array", () => {
    const blocks = flattenSchema(z.number().array());

    expect(blocks).toHaveLength(1);
    expect(blocks).toEqual([
      {
        block: "content",
        type: "array",
        innerBlocks: [{ block: "content", type: "number" }],
      },
    ] as Block[]);
  });

  test("Flatten simple object", () => {
    const blocks = flattenSchema(
      z.object({
        foo: z.string(),
        bar: z.number(),
      })
    );

    expect(blocks).toHaveLength(2);
    expect(blocks).toEqual([
      {
        block: "content",
        type: "string",
      },
      {
        block: "content",
        type: "number",
      },
    ] as Block[]);
  });

  test("Flatten simple nested object", () => {
    const blocks = flattenSchema(
      z.object({
        foo: z.string(),
        bar: z.object({
          baz: z.number(),
        }),
      })
    );

    expect(blocks).toHaveLength(2);
    expect(blocks).toEqual([
      {
        block: "content",
        type: "string",
      },
      {
        block: "content",
        type: "number",
      },
    ] as Block[]);
  });

  test("Flatten complex array", () => {
    const blocks = flattenSchema(z.number().or(z.string()).array().array());

    expect(blocks).toHaveLength(1);
    expect(blocks).toEqual<Block[]>([
      {
        block: "content",
        type: "array",
        innerBlocks: [
          {
            block: "content",
            type: "array",
            innerBlocks: [
              {
                block: "discriminator",
                options: {},
              },
            ],
          },
        ],
      },
    ]);
  });
});
