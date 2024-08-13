import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Category, CategoryDocument } from './schema/category.schema';
import { Model } from 'mongoose';
import { AddCategoryInput, AddCategoryOutput } from './dto/add-category.dto';
import { EditCategoryInput, EditCategoryOutput } from './dto/edit-category.dto';
import { RemoveCategoryOutput } from './dto/remove-category.dto';
import { GetCategoryOutput } from './dto/get-category.dto';
import {
  GetCategoriesInput,
  GetCategoriesOutput,
} from './dto/get-categories.dto';
import { CategoryFilter } from './category.filter';

@Injectable()
export class CategoryService {
  constructor(
    @InjectModel(Category.name)
    private readonly categoryModel: Model<CategoryDocument>,
  ) {}

  async addCategory(input: AddCategoryInput): Promise<AddCategoryOutput> {
    const category = await this.categoryModel.create({
      ...input,
    });

    return {
      message: 'category added successfully',
      category,
    };
  }

  async editCategory(
    slug: string,
    input: EditCategoryInput,
  ): Promise<EditCategoryOutput> {
    const category = await this.categoryModel.findOneAndUpdate(
      { slug },
      { ...input },
      { new: true },
    );

    if (!category) throw new NotFoundException();

    return {
      message: 'category edited successfully',
      category,
    };
  }

  async removeCategory(slug: string): Promise<RemoveCategoryOutput> {
    const category = await this.categoryModel.findOneAndDelete({ slug });

    if (!category) throw new NotFoundException();

    return {
      message: 'category removed successfully',
      category,
    };
  }

  async getCategory(slug: string): Promise<GetCategoryOutput> {
    const category = await this.categoryModel.findOne({ slug });

    if (!category) throw new NotFoundException();

    return {
      message: 'category was found successfully',
      category,
    };
  }

  async getCategories(input: GetCategoriesInput): Promise<GetCategoriesOutput> {
    const filters = new CategoryFilter(input);

    const categories = await this.categoryModel.find(
      filters.getFilterQuery(),
      {},
      filters.getQueryOptions(),
    );

    const totalCount = await this.categoryModel.countDocuments(
      filters.getFilterQuery(),
    );

    return {
      message: 'categories was found successfully',
      pagination: { page: input.page, totalCount },
      categories,
    };
  }
}
