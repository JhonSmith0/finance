import { randomUUID } from 'crypto';

export class Category {
  public id: string;
  public name: string;
  public userId: string;
  public defaultCategory: boolean;

  constructor(data: OptionalProps<ClassProperties<Category>, 'id'>) {
    Object.assign(this, data);
    this.id ||= randomUUID();
    this.name = this.name.toLowerCase();
  }
}
