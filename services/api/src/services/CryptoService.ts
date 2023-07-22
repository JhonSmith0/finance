import { Injectable } from '@nestjs/common';
import { compare, hash } from 'bcrypt';

@Injectable()
export class CryptoService {
  constructor(private salt: number) {}

  public async encrypt(data: string) {
    return await hash(data, this.salt);
  }

  public async compare(encryptedString: string, candidate: string) {
    return await compare(encryptedString, candidate);
  }
}
