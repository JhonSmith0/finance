import { ILogin } from "@/schema/auth";
import { api } from "./http";

export async function loginService(data: ILogin) {
  const result = await api.post("/auth/login", data);
  return result.data;
}
