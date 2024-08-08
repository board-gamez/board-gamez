import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { NotificationModule } from '@app/notification';
import { JwtModule } from '@app/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModelFactory } from 'src/user/schema/user.schema';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([UserModelFactory]),
    NotificationModule,
    JwtModule,
  ],
  providers: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
