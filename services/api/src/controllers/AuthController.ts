import {
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  Res,
  UseGuards,
} from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { Response } from 'express';
import { UserEntity } from 'src/decorators/UserEntity';
import { SafeUserDTO } from 'src/dto/SafeUserDTO';
import { UserLoginDTO } from 'src/dto/UserLoginDTO';
import { UserRegisterDTO } from 'src/dto/UserRegisterDTO';
import { UserLogged } from 'src/guards/UserLogged';
import { User } from 'src/models/User';
import { AuthService } from 'src/services/AuthService';
import { JWTService } from 'src/services/JWTService';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private jwtService: JWTService,
  ) {}

  private generateAndSetJwtOnCookies(res: Response, user: User) {
    const expires = new Date(
      Date.now() + Number(process.env.JWT_COOKIE_EXPIRATION_TIME),
    );

    return res.cookie(
      'authorization',
      this.jwtService.encode({ id: user.id }),
      {
        expires,
      },
    );
  }

  @HttpCode(200)
  @Post('login')
  public async login(@Body() body: UserLoginDTO, @Res() res: Response) {
    const user = await this.authService.login(body);
    this.generateAndSetJwtOnCookies(res, user).end();
  }

  @Post('register')
  public async register(@Body() body: UserRegisterDTO, @Res() res: Response) {
    const user = await this.authService.register(body);
    this.generateAndSetJwtOnCookies(res, user).end();
  }

  @Get('me')
  @UseGuards(UserLogged)
  public async getMe(@UserEntity() user: User) {
    return plainToInstance(SafeUserDTO, user, {
      excludeExtraneousValues: true,
    });
  }
}
