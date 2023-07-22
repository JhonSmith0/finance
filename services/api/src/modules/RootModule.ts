import { Module, Provider } from '@nestjs/common';
import { AuthController } from 'src/controllers/AuthController';
import { AuthService } from 'src/services/AuthService';
import { CryptoService } from 'src/services/CryptoService';
import { JWTService } from 'src/services/JWTService';
import { PrismaService } from 'src/services/PrismaService';

const providers: Provider[] = [
  {
    provide: JWTService,
    useValue: new JWTService(
      process.env.JWT_SECRET_KEY,
      process.env.JWT_EXPIRATION_TIME,
    ),
  },
  {
    provide: CryptoService,
    useValue: new CryptoService(+process.env.BCRYPT_SALT),
  },
];

@Module({
  controllers: [AuthController],
  providers: [...providers, AuthService, PrismaService],
  imports: [],
})
export class RootModule {}
