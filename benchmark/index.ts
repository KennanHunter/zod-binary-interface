import { z } from "zod";
import { ZodBinaryInterface } from "../src";
import { SerializableSchema } from "../src/shared/serializableSchemaTypes";
import { booleansData, booleansSchema } from "./data/booleans";
import { scoutingData, scoutingSchema } from "./data/scouting-app";

export const timeFunction = <T>(func: () => T, iterations = 1): [number, T] => {
  const time = new Array(iterations)
    .fill(0)
    .map(() => {
      const startTime = performance.now();

      func();

      const endTime = performance.now();

      return endTime - startTime;
    })
    .reduce((prev, cur) => prev + cur / iterations, 0);

  const res = func();

  return [time, res];
};

type BenchmarkResult = {
  time: number;
  length?: number;
};

type BenchmarkResults = {
  zodBinaryInterface: BenchmarkResult;
  json: BenchmarkResult;
};

export const benchmarkWithData = <T extends SerializableSchema>(params: {
  data: z.infer<T>;
  schema: T;
  iterations?: number;
  name: string;
}): {
  iterations: number;
  encode: BenchmarkResults;
  decode: BenchmarkResults;
  name: string;
} => {
  params.schema.parse(params.data);

  const [zbiEncodeTime, zbiEncodedData] = timeFunction(() => {
    const zbi = ZodBinaryInterface.fromSchema(params.schema);

    return zbi.encode(params.data);
  }, params.iterations ?? 1);

  const [jsonEncodeTime, jsonEncodedData] = timeFunction(() => {
    return JSON.stringify(params.data);
  }, params.iterations ?? 1);

  const [zbiDecodeTime, zbiDecodedData] = timeFunction(() => {
    const zbi = ZodBinaryInterface.fromSchema(params.schema as any);

    return zbi.decode(zbiEncodedData);
  }, params.iterations);

  const [jsonDecodeTime, jsonDecodedData] = timeFunction(() => {
    return JSON.parse(jsonEncodedData) as unknown;
  }, params.iterations);

  return {
    name: params.name,
    iterations: params.iterations ?? 1,
    encode: {
      zodBinaryInterface: {
        time: zbiEncodeTime,
        length: new Uint8Array(zbiEncodedData).length,
      },
      json: {
        time: jsonEncodeTime,
        length: new TextEncoder().encode(jsonEncodedData).length,
      },
    },
    decode: {
      zodBinaryInterface: {
        time: zbiDecodeTime,
      },
      json: {
        time: jsonDecodeTime,
      },
    },
  };
};

export const main = () => {
  const runOnceAndMany = (...[props]: Parameters<typeof benchmarkWithData>) => [
    benchmarkWithData({ ...props, iterations: 1 }),
    benchmarkWithData({ ...props, iterations: 100 }),
  ];

  const rows = [
    ...runOnceAndMany({
      data: booleansData,
      schema: booleansSchema,
      name: "booleans",
    }),
    // ...runOnceAndMany({
    //   data: scoutingData,
    //   schema: scoutingSchema,
    //   name: "scouting",
    // }),
  ]
    .map((val) => ({
      name: val.name,
      Iterations: val.iterations,
      "ZBI Time": val.encode.zodBinaryInterface.time.toFixed(6) + " seconds",
      "ZBI Size": val.encode.zodBinaryInterface.length?.toFixed(0) + " bytes",
      "JSON Time": val.encode.json.time.toFixed(6) + " seconds",
      "JSON Size": val.encode.json.length?.toFixed(0) + " bytes",
    }))
    .reduce((prev, cur) => {
      prev[cur.name + "-" + cur.Iterations] = cur;
      return prev;
    }, {} as Record<string, any>);

  const header = [
    "Iterations",
    "ZBI Time",
    "ZBI Size",
    "JSON Time",
    "JSON Size",
  ];

  console.table(rows, header);
};

main();
