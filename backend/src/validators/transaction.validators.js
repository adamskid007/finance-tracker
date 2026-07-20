import { z } from "zod";

export const createTransactionSchema = z.object({
  title: z
    .string()
    .trim()
    .min(1, "Title is required"),

  amount: z
    .coerce.number().positive()
    .positive("Amount must be greater than zero"),

  type: z.enum([
    "INCOME",
    "EXPENSE",
  ]),

  category: z
    .string()
    .trim()
    .min(1, "Category is required"),

  date: z.string().optional(),
});

export const updateTransactionSchema = createTransactionSchema.partial();