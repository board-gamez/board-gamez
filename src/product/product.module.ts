import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductModelFactory } from './schema/product.schema';

@Module({
  imports: [MongooseModule.forFeatureAsync([ProductModelFactory])],
  providers: [ProductService],
  controllers: [ProductController],
})
export class ProductModule {}
