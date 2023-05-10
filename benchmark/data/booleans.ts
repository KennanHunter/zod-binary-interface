import { z } from "zod";

// cspell:disable
export const booleansData: z.infer<typeof booleansSchema> = {
  ein: true,
  zwei: true,
  drei: true,
  vier: true,
  funf: true,
  sechs: true,
  sieben: true,
  acht: true,
  neun: true,
  zehn: true,
  elf: true,
  zwolf: true,
  dreizehn: true,
  funfzehn: true,
  vierzehn: true,
  achtzehn: true,
  neunzehn: true,
  zwanzig: true,
  einundzwanzig: true,
  zweiundzwanzig: true,
  dreiundzwanzig: true,
  vierundzwanzig: true,
  funfundzwanzig: true,
  sechsundzwanzig: true,
  siebundzwanzig: true,
  achtundzwanzig: true,
  neunundzwanzig: true,
  dreizig: true,
};

export const booleansSchema = z.object({
  ein: z.boolean(),
  zwei: z.boolean(),
  drei: z.boolean(),
  vier: z.boolean(),
  funf: z.boolean(),
  sechs: z.boolean(),
  sieben: z.boolean(),
  acht: z.boolean(),
  neun: z.boolean(),
  zehn: z.boolean(),
  elf: z.boolean(),
  zwolf: z.boolean(),
  dreizehn: z.boolean(),
  funfzehn: z.boolean(),
  vierzehn: z.boolean(),
  achtzehn: z.boolean(),
  neunzehn: z.boolean(),
  zwanzig: z.boolean(),
  einundzwanzig: z.boolean(),
  zweiundzwanzig: z.boolean(),
  dreiundzwanzig: z.boolean(),
  vierundzwanzig: z.boolean(),
  funfundzwanzig: z.boolean(),
  sechsundzwanzig: z.boolean(),
  siebundzwanzig: z.boolean(),
  achtundzwanzig: z.boolean(),
  neunundzwanzig: z.boolean(),
  dreizig: z.boolean(),
});
