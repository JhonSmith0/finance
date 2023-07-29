import { Transform } from 'class-transformer';
import {
  IsDate,
  IsIn,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
  Min,
} from 'class-validator';
import { Transaction } from 'src/models/Transaction';
import { TransactionType } from 'src/models/TransactionType';

export class TransactionNewDTO
  implements Omit<ClassProperties<Transaction>, 'id' | 'userId'>
{
  @IsDate()
  @Transform((args) =>
    args.value instanceof Date ? args.value : new Date(args.value),
  )
  public date: Date;

  @Min(0)
  @IsNumber()
  public value: number;

  @MaxLength(72)
  @IsString()
  @IsOptional()
  public description: string = '';

  @IsString()
  @IsIn(['expense', 'income'] as TransactionType[])
  public type: TransactionType;

  @IsString()
  categoryId: string;
}
