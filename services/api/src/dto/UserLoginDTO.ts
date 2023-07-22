import { IsString, MaxLength, MinLength } from 'class-validator';

export class UserLoginDTO {
  @MaxLength(256)
  @IsString()
  public email: string;

  @MaxLength(256)
  @MinLength(8)
  @IsString()
  public password: string;
}
