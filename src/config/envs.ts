import 'dotenv/config';
import { z } from 'zod';

const envSchema = z
  .object({
    PORT: z.preprocess((val) => Number(val), z.number().int().positive()),
    PRODUCTS_SERVICE_HOST: z.string(),
    PRODUCTS_SERVICE_PORT: z.preprocess(
      (val) => Number(val),
      z.number().int().positive(),
    ),
    ORDERS_SERVICE_HOST: z.string(),
    ORDERS_SERVICE_PORT: z.preprocess(
      (val) => Number(val),
      z.number().int().positive(),
    ),
  })
  .passthrough();

type EnvsVars = z.infer<typeof envSchema>;

const { error, data } = envSchema.safeParse(process.env);

if (error) {
  throw new Error(`Invalid environment variables: ${error.message}`);
}

export const envs: EnvsVars = data;
