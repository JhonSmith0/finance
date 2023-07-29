import { Transaction } from './Transaction';

export class TransactionWithCategory extends Transaction {
  public category: { name: string };
  constructor(data: ClassProperties<TransactionWithCategory>) {
    super(data);
    this.category = data.category;
  }
}
