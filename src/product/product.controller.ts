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

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Permission('ADD_PRODUCT')
  @Post()
  async addProduct(@Body() input: AddProductInput): Promise<AddProductOutput> {
    return this.productService.addProduct(input);
  }

  @Permission('EDIT_PRODUCT')
  @Put(':slug')
  async editProduct(
    @Param('slug') slug: string,
    @Body() input: EditProductInput,
  ): Promise<EditProductOutput> {
    return this.productService.editProduct(slug, input);
  }

  @Permission('REMOVE_PRODUCT')
  @Delete(':slug')
  async removeProduct(
    @Param('slug') slug: string,
  ): Promise<RemoveProductOutput> {
    return this.productService.removeProduct(slug);
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
