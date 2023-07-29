import { ITransaction, ITransactionCreate } from "@/types";
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
}
