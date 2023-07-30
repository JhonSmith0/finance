import { ExecutionContext, createParamDecorator } from '@nestjs/common';
import { TransactionWithCategory } from 'src/models/TransactionWithCategory';

export const TransactionEntity = createParamDecorator(
  (field: keyof TransactionWithCategory, ctx: ExecutionContext) => {
    const transaction = ctx.switchToHttp().getRequest()
      .transaction as TransactionWithCategory;
    return field ? transaction?.[field] : transaction;
  },
);
