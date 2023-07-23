import { IsString, MaxLength, MinLength } from 'class-validator';
import { Category } from 'src/models/Category';

export class CategoryUpdateDTO
  implements ClassProperties<Omit<Category, 'id' | 'userId'>>
{
  @MaxLength(24)
  @MinLength(1)
  @IsString()
  public name: string;
}
