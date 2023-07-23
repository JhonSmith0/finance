import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
  UseGuards,
} from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { SafeUserDTO } from 'src/dto/SafeUserDTO';
import { UserLoginDTO } from 'src/dto/UserLoginDTO';
import { UserRegisterDTO } from 'src/dto/UserRegisterDTO';
import { User } from 'src/models/User';
import { CryptoService } from './CryptoService';
import { PrismaService } from './PrismaService';
import { UserLogged } from 'src/guards/UserLogged';

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

    return new User(newUser);
  }

  public async login(data: UserLoginDTO) {
    const user = await this.database.user.findUnique({
      where: {
        email: data.email,
      },
    });
    const exists = !!user;
    if (!exists) throw new NotFoundException();

    return new User(user);
  }

  public async getUser(id: string) {
    const user = await this.database.user.findUnique({ where: { id } });
    if (!user) throw new BadRequestException();
    return plainToInstance(SafeUserDTO, user, {
      excludeExtraneousValues: true,
    });
  }
}
