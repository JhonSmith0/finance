import { BadRequestException, Injectable } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { SafeUserDTO } from 'src/dto/SafeUserDTO';
import { UserLoginDTO } from 'src/dto/UserLoginDTO';
import { UserRegisterDTO } from 'src/dto/UserRegisterDTO';
import { User } from 'src/models/User';
import { CategoryService } from './CategoryService';
import { CryptoService } from './CryptoService';
import { PrismaService } from './PrismaService';

@Injectable()
export class AuthService {
  constructor(
    private cryptoService: CryptoService,
    private database: PrismaService,
    private categoryService: CategoryService,
  ) {}

  public async register(data: UserRegisterDTO) {
    const user = await this.database.user.findUnique({
      where: {
        email: data.email,
      },
    });
    const exists = !!user;
    if (exists) throw new BadRequestException();

    const newUser = new User(data);
    await newUser.hashPassword(this.cryptoService);

    await this.database.user.create({ data: newUser });
    await this.categoryService.createDefaultCategory(newUser);

    return new User(newUser);
  }

  public async login(data: UserLoginDTO) {
    const user = await this.database.user.findUnique({
      where: {
        email: data.email,
      },
    });
    const exists = !!user;
    if (!exists) throw new BadRequestException();

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
