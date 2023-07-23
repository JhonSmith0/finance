import { IUser } from "@/types";
import { api } from "./http";

export async function getMeService() {
  return (await api.get<IUser>("/auth/me")).data;
}
