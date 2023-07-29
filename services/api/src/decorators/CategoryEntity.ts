import { createParamDecorator } from '@nestjs/common';
import { ExecutionContextHost } from '@nestjs/core/helpers/execution-context-host';
import { Category } from 'src/models/Category';

export const CategoryEntity = createParamDecorator(
  (field: keyof Category, ctx: ExecutionContextHost) => {
    const request = ctx.switchToHttp().getRequest();
    const category = request.category as Category | void;
    return category?.[field];
  },
);
