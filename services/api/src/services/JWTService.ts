import { Injectable } from '@nestjs/common';
import { decode, sign, verify } from 'jsonwebtoken';

@Injectable()
export class JWTService {
  constructor(
    private secretKey: string,
    private expirationTime: number | string,
  ) {}

  public encode(data: Parameters<typeof sign>[0]) {
    return sign(data, this.secretKey, {
      expiresIn: this.expirationTime,
    });
  }

  public decode(token: string) {
    return decode(token);
  }

  public verify(token: string) {
    return verify(token, this.secretKey);
  }
}
