import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { UserEntity } from 'src/decorators/UserEntity';
import { CategoryNewDTO } from 'src/dto/CategoryNewDTO';
import { CategoryUpdateDTO } from 'src/dto/CategoryUpdateDTO';
import { UserLogged } from 'src/guards/UserLogged';
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

  @Delete(':id')
  public async deleteCategory(
    @UserEntity() user: User,
    @Param('id') id: string,
  ) {
    return await this.categoryService.deleteCategory(user, id);
  }

  @Patch(':id')
  public async updateCategory(
    @UserEntity() user: User,
    @Param('id') id: string,
    @Body() body: CategoryUpdateDTO,
  ) {
    return await this.categoryService.updateCategory(user, id, body);
  }
}
