import { IsString, MaxLength, MinLength } from 'class-validator';

export class UserRegisterDTO {
  @MaxLength(64)
  @MinLength(2)
  @IsString()
  public name: string;

  @MaxLength(256)
  @IsString()
  public email: string;

  @MaxLength(256)
  @MinLength(8)
  @IsString()
  public password: string;
}
