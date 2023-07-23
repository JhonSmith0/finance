import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Headers,
  HttpCode,
  Post,
  Res,
} from '@nestjs/common';
import { parse } from 'cookie';
import { Response } from 'express';
import { UserLoginDTO } from 'src/dto/UserLoginDTO';
import { UserRegisterDTO } from 'src/dto/UserRegisterDTO';
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
  public async getMe(@Headers('cookie') cookies: string) {
    const cookieObj = parse(cookies || '');
    const { authorization } = cookieObj;
    if (!authorization) throw new BadRequestException();

    try {
      const { id } = this.jwtService.verify(authorization) as { id: string };
      const user = await this.authService.getUser(id);
      return user;
    } catch (error) {
      throw new BadRequestException();
    }
  }
}
