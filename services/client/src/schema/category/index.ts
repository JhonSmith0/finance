import * as y from "yup";

export const newCategorySchema = y.object({
  name: y.string().min(3).max(24).required(),
});

export const updateCategorySchema = newCategorySchema;

export interface ICategoryCreate
  extends y.InferType<typeof newCategorySchema> {}
export interface ICategoryUpdate
  extends y.InferType<typeof newCategorySchema> {}
