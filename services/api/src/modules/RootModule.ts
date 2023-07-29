import { Module, Provider } from '@nestjs/common';
import { AuthController } from 'src/controllers/AuthController';
import { CategoryController } from 'src/controllers/CategoryController';
import { TransactionController } from 'src/controllers/TransactionController';
import { AuthService } from 'src/services/AuthService';
import { CategoryService } from 'src/services/CategoryService';
import { CryptoService } from 'src/services/CryptoService';
import { JWTService } from 'src/services/JWTService';
import { PrismaService } from 'src/services/PrismaService';
import { TransactionService } from 'src/services/TransactionService';

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
  AuthService,
  PrismaService,
  CategoryService,
  TransactionService,
];

@Module({
  controllers: [AuthController, CategoryController, TransactionController],
  providers,
  imports: [],
})
export class RootModule {}
