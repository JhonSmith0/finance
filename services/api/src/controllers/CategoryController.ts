import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { CategoryEntity } from 'src/decorators/CategoryEntity';
import { UserEntity } from 'src/decorators/UserEntity';
import { CategoryNewDTO } from 'src/dto/CategoryNewDTO';
import { CategoryUpdateDTO } from 'src/dto/CategoryUpdateDTO';
import { UserHasAcessToCategoryInParamsId } from 'src/guards/UserHasAcessToCategoryInParamsId';
import { UserLogged } from 'src/guards/UserLogged';
import { Category } from 'src/models/Category';
import { User } from 'src/models/User';
import { CategoryService } from 'src/services/CategoryService';

@UseGuards(UserLogged)
@Controller('category')
export class CategoryController {
  constructor(private categoryService: CategoryService) {}

  @Post()
  public async create(@Body() data: CategoryNewDTO, @UserEntity() user: User) {
    return await this.categoryService.newCategory(data, user);
  }

  @Get()
  public async read(@UserEntity() user: User) {
    return await this.categoryService.getAllCategories(user);
  }

  @Get(':id')
  @UseGuards(UserHasAcessToCategoryInParamsId)
  public async readById(@CategoryEntity() category: Category) {
    if (!category) throw new NotFoundException();
    return category;
  }

  @Delete(':id')
  @UseGuards(UserHasAcessToCategoryInParamsId)
  public async deleteCategory(
    @UserEntity() user: User,
    @CategoryEntity('id') id: string,
  ) {
    return await this.categoryService.deleteCategory(user, id);
  }

  @Patch(':id')
  @UseGuards(UserHasAcessToCategoryInParamsId)
  public async updateCategory(
    @UserEntity() user: User,
    @CategoryEntity('id') id: string,
    @Body() body: CategoryUpdateDTO,
  ) {
    return await this.categoryService.updateCategory(user, id, body);
  }
}
