import {
  BadRequestException,
  ConflictException,
  Injectable,
} from '@nestjs/common';
import { CategoryNewDTO } from 'src/dto/CategoryNewDTO';
import { CategoryUpdateDTO } from 'src/dto/CategoryUpdateDTO';
import { Category } from 'src/models/Category';
import { User } from 'src/models/User';
import { PrismaService } from './PrismaService';

@Injectable()
export class CategoryService {
  constructor(private db: PrismaService) {}

  public async newCategory(
    data: CategoryNewDTO,
    user: User,
    defaultCategory = false,
  ) {
    const exists = await this.db.category.findFirst({
      where: {
        userId: user.id,
        name: data.name,
      },
    });

    if (!!exists) throw new ConflictException();
    const category = new Category({
      ...data,
      userId: user.id,
      defaultCategory,
    });

    await this.db.category.create({ data: category });

    return category;
  }

  public async readCategory(id: string) {
    const result = await this.db.category.findUnique({
      where: {
        id,
      },
    });
    if (result) return new Category(result);
    return result;
  }

  public async getAllCategories(user: User) {
    return await this.db.category.findMany({
      where: {
        userId: user.id,
      },
    });
  }

  public async getDefaultCategory(user: User) {
    return this.db.category.findFirst({
      where: {
        user: {
          id: user.id,
        },
        defaultCategory: true,
      },
    });
  }

  public async createDefaultCategory(user: User) {
    const exists = await this.getDefaultCategory(user);
    if (exists) return exists;

    return this.db.category.create({
      data: new Category({
        defaultCategory: true,
        name: 'Diversos',
        userId: user.id,
      }),
    });
  }

  public async deleteCategory(user: User, id: string) {
    const defaultCategory = await this.createDefaultCategory(user);
    if (id === defaultCategory.id) throw new BadRequestException();

    await this.db.transaction.updateMany({
      where: {
        category: {
          id,
        },
      },
      data: {
        categoryId: {
          set: defaultCategory.id,
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
