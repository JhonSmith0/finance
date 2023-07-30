export * from "@/schema/category";
export * from "@/schema/transaction";

export interface ITransaction {
  id: string;
  date: string;
  value: number;
  type: ITransactionType;
  description: string;
  categoryId: ICategoryType;
  category: {
    name: string;
  };
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

export interface ICategoryCreateUpdateForm extends Pick<ICategory, "name"> {}

export type ICategoryUpdate = Pick<ICategory, "id"> & Partial<ICategory>;

export interface IUser {
  id: string;
  email: string;
  name: string;
}
