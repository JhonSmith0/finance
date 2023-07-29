import { Injectable } from '@nestjs/common';
import { TransactionNewDTO } from 'src/dto/transaction/TransactionNewDTO';
import { TransactionUpdateDTO } from 'src/dto/transaction/TransactionUpdateDTO';
import { Transaction } from 'src/models/Transaction';
import { TransactionWithCategory } from 'src/models/TransactionWithCategory';
import { User } from 'src/models/User';
import { PrismaService } from './PrismaService';

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

  public async delete(id: string): Promise<TransactionWithCategory> {
    return await this.database.transaction.delete({
      where: {
        id,
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
  public async read(id: string): Promise<TransactionWithCategory | void> {
    return await this.database.transaction.findUnique({
      where: {
        id,
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

  public async update(
    id: string,
    data: TransactionUpdateDTO,
  ): Promise<TransactionWithCategory> {
    return await this.database.transaction.update({
      where: {
        id,
      },
      data,
      include: {
        category: {
          select: {
            name: true,
          },
        },
      },
    });
  }

  public async readAll(user: User): Promise<TransactionWithCategory[]> {
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
