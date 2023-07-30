import {
  CanActivate,
  ExecutionContext,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Request } from 'express';
import { TransactionWithCategory } from 'src/models/TransactionWithCategory';
import { User } from 'src/models/User';
import { TransactionService } from 'src/services/TransactionService';

@Injectable()
export class UserHasAcessToTransactionInParamsId implements CanActivate {
  constructor(private transactionService: TransactionService) {}

  public async canActivate(ctx: ExecutionContext) {
    const request = ctx
      .switchToHttp()
      .getRequest<
        Request & { user: User; transaction: TransactionWithCategory }
      >();

    const id = request.params.id as string;
    const user = request.user;

    const transaction = await this.transactionService.read(id);
    if (!transaction || transaction.userId !== user.id)
      throw new NotFoundException();

    request.transaction = transaction;
    return true;
  }
}
