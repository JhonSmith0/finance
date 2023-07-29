import { Injectable, UseGuards } from '@nestjs/common';
import { TransactionNewDTO } from 'src/dto/transaction/TransactionNewDTO';
import { UserLogged } from 'src/guards/UserLogged';
import { Transaction } from 'src/models/Transaction';
import { User } from 'src/models/User';
import { PrismaService } from './PrismaService';

@UseGuards(UserLogged)
@Injectable()
export class TransactionService {
  constructor(private database: PrismaService) {}
  public async create(data: TransactionNewDTO, user: User) {
    const transaction = new Transaction({ ...data, userId: user.id });

    return await this.database.transaction.create({
      data: transaction,
      include: {
        category: {
          select: {
            name: true,
          },
        },
      },
    });
  }

  public async readAll(user: User) {
    return await this.database.transaction.findMany({
      where: {
        userId: user.id,
      },
      include: {
        category: {
          select: {
            name: true,
          },
        },
      },
    });
  }
}
