import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';
import { NotificationModule } from '@app/notification';

@Module({
  imports: [
    NotificationModule,
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        PORT: Joi.number().required(),
        KAVENEGAR_API_KEY: Joi.string().required(),
        KAVENEGAR_TEMPLATE: Joi.string().required(),
      }),
    }),
  ],
})
export class AppModule {}
