import { ConflictException, Injectable } from '@nestjs/common';
import { CategoryNewDTO } from 'src/dto/CategoryNewDTO';
import { CategoryUpdateDTO } from 'src/dto/CategoryUpdateDTO';
import { Category } from 'src/models/Category';
import { User } from 'src/models/User';
import { PrismaService } from './PrismaService';

@Injectable()
export class CategoryService {
  constructor(private db: PrismaService) {}

  public async newCategory(data: CategoryNewDTO, user: User) {
    const exists = await this.db.category.findFirst({
      where: {
        userId: user.id,
        name: data.name,
      },
    });

    if (!!exists) throw new ConflictException();
    const category = new Category({ ...data, userId: user.id });

    await this.db.category.create({ data: category });

    return category;
  }

  public async getAllCategories(user: User) {
    return await this.db.category.findMany({
      where: {
        userId: user.id,
      },
    });
  }

  public async deleteCategory(user: User, id: string) {
    await this.db.transaction.deleteMany({
      where: {
        category: {
          id,
        },
      },
    });

    return await this.db.category.delete({
      where: {
        userId: user.id,
        id,
      },
    });
  }

  public async updateCategory(user: User, id: string, dto: CategoryUpdateDTO) {
    return await this.db.category.update({
      where: {
        userId: user.id,
        id,
      },
      data: dto,
    });
  }
}
