import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Post,
  UseGuards,
} from '@nestjs/common';
import { UserEntity } from 'src/decorators/UserEntity';
import { TransactionNewDTO } from 'src/dto/transaction/TransactionNewDTO';
import { UserLogged } from 'src/guards/UserLogged';
import { User } from 'src/models/User';
import { CategoryService } from 'src/services/CategoryService';
import { TransactionService } from 'src/services/TransactionService';

@UseGuards(UserLogged)
@Controller('transaction')
export class TransactionController {
  constructor(
    private transactionService: TransactionService,
    private categoryService: CategoryService,
  ) {}

  @Post()
  public async create(
    @Body() data: TransactionNewDTO,
    @UserEntity() user: User,
  ) {
    const category = await this.categoryService.readCategory(data.categoryId);
    if (!category || category.userId !== user.id) throw new NotFoundException();

    const result = await this.transactionService.create(data, user);
    return result;
  }

  @Get()
  public async readAll(@UserEntity() user: User) {
    const result = await this.transactionService.readAll(user);
    return result;
  }
}
