import { z } from 'zod';

export const exchangeRateSchema = z.object({
  validFor: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Must be in YYYY-MM-DD format'),
  order: z.number(),
  country: z.string(),
  currency: z.string(),
  amount: z.number().positive(),
  currencyCode: z.string().length(3, 'Currency code must be 3 characters'),
  rate: z.number().positive(),
});

export const exRateDailyRestResponseSchema = z.object({
  rates: z.array(exchangeRateSchema),
});

export type ExchangeRate = z.infer<typeof exchangeRateSchema>;
export type ExRateDailyRestResponse = z.infer<typeof exRateDailyRestResponseSchema>;