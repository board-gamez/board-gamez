import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { CategoryService } from './category.service';
import {
  GetCategoriesInput,
  GetCategoriesOutput,
} from './dto/get-categories.dto';
import { AddCategoryInput, AddCategoryOutput } from './dto/add-category.dto';
import { Permission } from 'src/iam/authorization/decorator/permission.decorator';
import { EditCategoryInput, EditCategoryOutput } from './dto/edit-category.dto';
import { RemoveCategoryOutput } from './dto/remove-category.dto';
import { GetCategoryOutput } from './dto/get-category.dto';

@Controller('categories')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Permission('ADD_CATEGORY')
  @Post()
  async addCategory(
    @Body() input: AddCategoryInput,
  ): Promise<AddCategoryOutput> {
    return this.categoryService.addCategory(input);
  }

  @Permission('EDIT_CATEGORY')
  @Put(':slug')
  async editCategory(
    @Param('slug') slug: string,
    @Body() input: EditCategoryInput,
  ): Promise<EditCategoryOutput> {
    return this.categoryService.editCategory(slug, input);
  }

  @Permission('REMOVE_CATEGORY')
  @Delete(':slug')
  async removeCategory(
    @Param('slug') slug: string,
  ): Promise<RemoveCategoryOutput> {
    return this.categoryService.removeCategory(slug);
  }

  @Get(':slug')
  async getCategory(@Param('slug') slug: string): Promise<GetCategoryOutput> {
    return this.categoryService.getCategory(slug);
  }

  @Get()
  async getCategories(
    @Query() input: GetCategoriesInput,
  ): Promise<GetCategoriesOutput> {
    return this.categoryService.getCategories(input);
  }
}
