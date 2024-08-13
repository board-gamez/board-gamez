import { Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { CategoryModelFactory } from './schema/category.schema';

@Module({
  imports: [MongooseModule.forFeatureAsync([CategoryModelFactory])],
  providers: [CategoryService],
  controllers: [CategoryController],
})
export class CategoryModule {}
