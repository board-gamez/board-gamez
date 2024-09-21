import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { OrderModelFactory } from './schema/order.schema';
import { ProductModelFactory } from 'src/product/schema/product.schema';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([OrderModelFactory, ProductModelFactory]),
    HttpModule,
  ],
  providers: [OrderService],
  controllers: [OrderController],
})
export class OrderModule {}
