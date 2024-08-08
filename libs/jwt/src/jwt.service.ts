import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class JwtService {
  private privateKey: string;

  constructor(private readonly configService: ConfigService) {
    this.privateKey = this.configService.get<string>('PRIVATE_KEY');
  }

  async sign(expiration: number, userId: string): Promise<string> {
    return jwt.sign({ userId }, this.privateKey, {
      expiresIn: `${expiration}d`,
    });
  }

  async verify(token: string): Promise<any> {
    try {
      return jwt.verify(token, this.privateKey);
    } catch (err) {
      throw new UnauthorizedException();
    }
  }
}
