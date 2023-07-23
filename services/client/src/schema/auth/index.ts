import * as y from "yup";

export const loginSchema = y.object({
  email: y.string().required().max(256),
  password: y.string().required().min(8).max(256),
});

export const registerSchema = y.object({
  name: y.string().required().min(3).max(64),
  email: y.string().required().max(256),
  password: y.string().required().min(8).max(256),
});

export interface ILogin extends y.InferType<typeof loginSchema> {}
export interface IRegister extends y.InferType<typeof registerSchema> {}
