import { Expose } from 'class-transformer';
import { User } from 'src/models/User';

export class SafeUserDTO implements Omit<ClassProperties<User>, 'password'> {
  @Expose()
  public id: string;
  @Expose()
  public name: string;
  @Expose()
  public email: string;
}
