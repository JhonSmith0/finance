import { randomUUID } from 'crypto';
import { CryptoService } from 'src/services/CryptoService';

export class User {
  public id: string;
  public name: string;
  public email: string;
  public password: string;

  constructor(data: OptionalProps<ClassProperties<User>, 'id'>) {
    Object.assign(this, data);
    this.id ||= randomUUID();
  }

  public async hashPassword(hasher: CryptoService) {
    this.password = await hasher.encrypt(this.password);
    return this;
  }
}
