import { Module } from '@nestjs/common';
import { PublisherService } from './publisher.service';
import { PublisherController } from './publisher.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { PublisherModelFactory } from './schema/publisher.schema';

@Module({
  imports: [MongooseModule.forFeatureAsync([PublisherModelFactory])],
  providers: [PublisherService],
  controllers: [PublisherController],
})
export class PublisherModule {}
