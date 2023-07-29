import { ITransaction, ITransactionCreate, ITransactionUpdate } from "@/types";
import { api } from "../http";

export class TransactionService {
  public static async create(data: ITransactionCreate) {
    const result = await api.post<ITransaction>("/transaction", data);
    return result.data;
  }
  public static async getAll() {
    const result = await api.get<ITransaction[]>("/transaction");
    return result.data;
  }

  public static async delete(id: ITransaction["id"]) {
    const result = await api.delete<ITransaction>(`/transaction/${id}`);
    return result.data;
  }

  public static async read(id: ITransaction["id"]) {
    const result = await api.get<ITransaction>(`/transaction/${id}`);
    return result.data;
  }

  public static async update(data: ITransactionUpdate) {
    const result = await api.patch<ITransaction>(
      `/transaction/${data.id}`,
      data
    );
    return result.data;
  }
}
