import { randomUUID } from 'crypto';
import { TransactionType } from './TransactionType';

export class Transaction {
  public id: string;
  public date: Date;
  public value: number;
  public description: string;

  public type: TransactionType;

  public userId: string;
  public categoryId: string;

  constructor(data: OptionalProps<ClassProperties<Transaction>, 'id'>) {
    Object.assign(this, data);
    this.id ||= randomUUID();
  }
}
