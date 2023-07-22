import { ConflictException, Injectable } from '@nestjs/common';
import { UserRegisterDTO } from 'src/dto/UserRegisterDTO';
import { User } from 'src/models/User';
import { CryptoService } from './CryptoService';
import { PrismaService } from './PrismaService';

@Injectable()
export class AuthService {
  constructor(
    private cryptoService: CryptoService,
    private database: PrismaService,
  ) {}

  public async register(data: UserRegisterDTO) {
    const user = await this.database.user.findUnique({
      where: {
        email: data.email,
      },
    });
    const exists = !!user;
    if (exists) throw new ConflictException();

    const newUser = new User(data);
    await newUser.hashPassword(this.cryptoService);

    await this.database.user.create({ data: newUser });

    return newUser;
  }
}
