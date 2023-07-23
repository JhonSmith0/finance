import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  Injectable,
} from '@nestjs/common';
import { parse } from 'cookie';
import { Request } from 'express';
import { User } from 'src/models/User';
import { JWTService } from 'src/services/JWTService';
import { PrismaService } from 'src/services/PrismaService';

@Injectable()
export class UserLogged implements CanActivate {
  constructor(
    private jwtService: JWTService,
    private database: PrismaService,
  ) {}

  public async canActivate(context: ExecutionContext) {
    const request = context
      .switchToHttp()
      .getRequest<Request & { user: User }>();
    const cookieObj = parse(request.headers.cookie || '');
    const { authorization } = cookieObj;

    const { id } = this.jwtService.verify(authorization) as { id: string };
    const user = await this.database.user.findUnique({
      where: {
        id,
      },
    });

    if (!user) throw new BadRequestException();

    request.user = new User(user);
    return true;
  }
}
