import { ICategory, ICategoryCreate, ICategoryUpdate } from "@/types";
import { api } from "../http";

export default class CategoryService {
  public static async create(data: ICategoryCreate) {
    const result = await api.post("/category", data);
    return result.data;
  }

  public static async getAll() {
    const result = await api.get<ICategory[]>("/category");
    return result.data;
  }

  public static async delete(id: string) {
    const result = await api.delete<ICategory[]>(`/category/${id}`);
    return result.data;
  }

  public static async update(id: string, data: ICategoryUpdate) {
    const result = await api.patch<ICategory>(`/category/${id}`, data);
    return result.data;
  }
}
