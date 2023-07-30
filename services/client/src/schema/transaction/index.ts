import * as y from "yup";

export const newTransactionSchema = y.object({
  date: y.date().required(),
  value: y.number().required(),
  type: y.mixed<"expense" | "income">().oneOf(["expense", "income"]).required(),
  description: y.string().default(""),
  categoryId: y.string().required(),
});

export const updateTransactionSchema = newTransactionSchema;

export interface ITransactionCreate
  extends y.InferType<typeof newTransactionSchema> {}

export interface ITransactionUpdate
  extends y.InferType<typeof updateTransactionSchema> {}
