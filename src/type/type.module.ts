import { Module } from '@nestjs/common';
import { TypeService } from './type.service';
import { TypeController } from './type.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { TypeModelFactory } from './schema/type.schema';

@Module({
  imports: [MongooseModule.forFeatureAsync([TypeModelFactory])],
  providers: [TypeService],
  controllers: [TypeController],
})
export class TypeModule {}
