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
import { ProductService } from './product.service';
import { GetProductsInput, GetProductsOutput } from './dto/get-products.dto';
import { AddProductInput, AddProductOutput } from './dto/add-product.dto';
import { Permission } from 'src/iam/authorization/decorator/permission.decorator';
import { EditProductInput, EditProductOutput } from './dto/edit-product.dto';
import { RemoveProductOutput } from './dto/remove-product.dto';
import { GetProductOutput } from './dto/get-product.dto';
import { CurrentUser } from 'src/iam/authorization/decorator/current-user.decorator';
import { User } from 'src/user/schema/user.schema';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Permission('ADD_PRODUCT')
  @Post()
  async addProduct(
    @CurrentUser() currentUser: User,
    @Body() input: AddProductInput,
  ): Promise<AddProductOutput> {
    return this.productService.addProduct(currentUser, input);
  }

  @Permission('EDIT_PRODUCT')
  @Put(':slug')
  async editProduct(
    @CurrentUser() currentUser: User,
    @Param('slug') slug: string,
    @Body() input: EditProductInput,
  ): Promise<EditProductOutput> {
    return this.productService.editProduct(currentUser, slug, input);
  }

  @Permission('REMOVE_PRODUCT')
  @Delete(':slug')
  async removeProduct(
    @CurrentUser() currentUser: User,
    @Param('slug') slug: string,
  ): Promise<RemoveProductOutput> {
    return this.productService.removeProduct(currentUser, slug);
  }

  @Get(':slug')
  async getProduct(@Param('slug') slug: string): Promise<GetProductOutput> {
    return this.productService.getProduct(slug);
  }

  @Get()
  async getProducts(
    @Query() input: GetProductsInput,
  ): Promise<GetProductsOutput> {
    return this.productService.getProducts(input);
  }
}
