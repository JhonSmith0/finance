import { ITransactionCreate } from "@/types";
import { api } from "../http";

export class TransactionService {
  public static async create(data: ITransactionCreate) {
    const result = await api.post("/transaction", data);
    return result.data;
  }
}
