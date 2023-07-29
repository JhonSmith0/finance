import { TransactionType } from '@prisma/client';
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

export class TransactionUpdateDTO {
  @IsDate()
  @Transform((args) =>
    args.value instanceof Date ? args.value : new Date(args.value),
  )
  @IsOptional()
  public date: Date;

  @Min(0)
  @IsNumber()
  @IsOptional()
  public value: number;

  @MaxLength(72)
  @IsString()
  @IsOptional()
  @IsOptional()
  public description: string = '';

  @IsString()
  @IsIn(['expense', 'income'] as TransactionType[])
  @IsOptional()
  public type: TransactionType;

  @IsString()
  categoryId: string;
}
