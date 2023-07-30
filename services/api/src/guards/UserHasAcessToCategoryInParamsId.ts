import {
  CanActivate,
  ExecutionContext,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Request } from 'express';
import { Category } from 'src/models/Category';
import { User } from 'src/models/User';
import { CategoryService } from 'src/services/CategoryService';

/**
 * Guard who verifies if the category user is trying to acess belongs to the user or if it exists
 */
@Injectable()
export class UserHasAcessToCategoryInParamsId implements CanActivate {
  constructor(private categoryService: CategoryService) {}

  public async canActivate(ctx: ExecutionContext) {
    const request = ctx
      .switchToHttp()
      .getRequest<Request & { user: User; category: Category }>();

    const user = request.user as User;

    const id = request.params.id as string;

    const category = await this.categoryService.readCategory(id);

    if (!category) throw new NotFoundException();
    if (category.userId !== user.id) throw new NotFoundException();

    request.category = category;
    return true;
  }
}
