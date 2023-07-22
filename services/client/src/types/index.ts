export * from "@/schema/transaction";

export interface ITransaction {
  id: string;
  date: string;
  value: number;
  type: ITransactionType;
  description: string;
  category: ICategoryType;
}

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
export interface ICategoryCreateUpdateForm extends Pick<ICategory, "name"> {}

export type ICategoryUpdate = Pick<ICategory, "id"> & Partial<ICategory>;
