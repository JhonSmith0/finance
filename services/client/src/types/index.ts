export interface ITransaction {
  id: string;
  date: string;
  value: number;
  type: ITransactionType;
  description: string;
  category: ICategoryType;
}

export type ITransactionCreate = Omit<ITransaction, "id">;

export type ITransactionUpdate = Partial<ITransaction> &
  Pick<ITransaction, "id">;

export type ITransactionType = "income" | "expense";

export type ICategoryType = string;

export type OptionalProps<T, K extends keyof T> = Omit<T, K> &
  Partial<Pick<T, K>>;

export interface ICategory {
  id: string;
  name: string;
}

export interface ICategoryCreate extends Pick<ICategory, "name"> {}
export interface ICategoryUpdate extends Pick<ICategory, "name"> {}
