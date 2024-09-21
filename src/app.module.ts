import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as Joi from 'joi';
import { NotificationModule } from '@app/notification';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthenticationMiddleware } from './iam/authentication/middleware/authentication.middleware';
import { UserModelFactory } from './user/schema/user.schema';
import { JwtModule } from '@app/jwt';
import { IamModule } from './iam/iam.module';
import { CategoryModule } from './category/category.module';
import { PublisherModule } from './publisher/publisher.module';
import { DesignerModule } from './designer/designer.module';
import { ArtistModule } from './artist/artist.module';
import { MechanismModule } from './mechanism/mechanism.module';
import { TypeModule } from './type/type.module';
import { GameModule } from './game/game.module';
import { ProductModule } from './product/product.module';
import { OrderModule } from './order/order.module';
import { OrderModelFactory } from './order/schema/order.schema';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        PORT: Joi.number().required(),
        KAVENEGAR_API_KEY: Joi.string().required(),
        KAVENEGAR_TEMPLATE: Joi.string().required(),
        ZIBAL_MERCHANT_ID: Joi.string().required(),
        ZIBAL_CALLBACK: Joi.string().required(),
        PAYMENT_REDIRECT_URL: Joi.string().required(),
      }),
    }),
    MongooseModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        uri: configService.get<string>('DB_URI'),
        connectionFactory: (connection: any) => {
          return connection;
        },
      }),
      inject: [ConfigService],
    }),
    MongooseModule.forFeatureAsync([UserModelFactory, OrderModelFactory]),
    NotificationModule,
    JwtModule,
    AuthModule,
    IamModule,
    UserModule,
    TypeModule,
    CategoryModule,
    PublisherModule,
    DesignerModule,
    ArtistModule,
    MechanismModule,
    GameModule,
    ProductModule,
    OrderModule,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthenticationMiddleware).forRoutes({
      path: '*',
      method: RequestMethod.ALL,
    });
  }
}
