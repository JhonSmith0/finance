import { Body, Controller, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { UserRegisterDTO } from 'src/dto/UserRegisterDTO';
import { AuthService } from 'src/services/AuthService';
import { JWTService } from 'src/services/JWTService';
import { PrismaService } from 'src/services/PrismaService';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private jwtService: JWTService,
    private database: PrismaService,
  ) {}

  @Post('register')
  public async register(@Body() body: UserRegisterDTO, @Res() res: Response) {
    const user = await this.authService.register(body);

    res.cookie('authorization', this.jwtService.encode({ id: user.id }));

    res.end();
  }
}
