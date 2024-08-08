import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class NotificationService {
  private apiKey: string;

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {
    this.apiKey = this.configService.get<string>('KAVENEGAR_API_KEY');
  }

  async lookup(template: string, receptor: string, token: string) {
    const remote =
      'https://api.kavenegar.com/v1/' +
      this.apiKey +
      '/verify/lookup.json?receptor=' +
      receptor +
      '&token=' +
      token +
      '&template=' +
      template +
      '&type=sms';

    await this.httpService.axiosRef.get(remote);
  }
}
