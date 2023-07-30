import { IsString, MaxLength, MinLength } from 'class-validator';
import { Category } from 'src/models/Category';

export class CategoryNewDTO
  implements
    Omit<ClassProperties<Category>, 'id' | 'userId' | 'defaultCategory'>
{
  @MaxLength(24)
  @MinLength(1)
  @IsString()
  public name: string;
}
