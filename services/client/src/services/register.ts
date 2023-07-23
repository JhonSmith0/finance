import { IRegister } from "@/schema/auth";
import { api } from "./http";

export async function registerService(data: IRegister) {
  const result = await api.post("/auth/register", data);
  return result.data;
}
