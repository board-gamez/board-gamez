import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Product, ProductDocument } from './schema/product.schema';
import { Model } from 'mongoose';
import { AddProductInput, AddProductOutput } from './dto/add-product.dto';
import { EditProductInput, EditProductOutput } from './dto/edit-product.dto';
import { RemoveProductOutput } from './dto/remove-product.dto';
import { GetProductOutput } from './dto/get-product.dto';
import { GetProductsInput, GetProductsOutput } from './dto/get-products.dto';
import { ProductFilter } from './product.filter';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product.name)
    private readonly productModel: Model<ProductDocument>,
  ) {}

  async addProduct(input: AddProductInput): Promise<AddProductOutput> {
    const product = await this.productModel.create({
      ...input,
    });

    return {
      message: 'product added successfully',
      product,
    };
  }

  async editProduct(
    slug: string,
    input: EditProductInput,
  ): Promise<EditProductOutput> {
    const product = await this.productModel.findOneAndUpdate(
      { slug },
      { ...input },
      { new: true },
    );

    if (!product) throw new NotFoundException();

    return {
      message: 'product edited successfully',
      product,
    };
  }

  async removeProduct(slug: string): Promise<RemoveProductOutput> {
    const product = await this.productModel.findOneAndDelete({ slug });

    if (!product) throw new NotFoundException();

    return {
      message: 'product removed successfully',
      product,
    };
  }

  async getProduct(slug: string): Promise<GetProductOutput> {
    const product = await this.productModel.findOne({ slug });

    if (!product) throw new NotFoundException();

    return {
      message: 'product was found successfully',
      product,
    };
  }

  async getProducts(input: GetProductsInput): Promise<GetProductsOutput> {
    const filters = new ProductFilter(input);

    const products = await this.productModel.find(
      filters.getFilterQuery(),
      {},
      filters.getQueryOptions(),
    );

    const totalCount = await this.productModel.countDocuments(
      filters.getFilterQuery(),
    );

    return {
      message: 'products was found successfully',
      pagination: { page: input.page, totalCount },
      products,
    };
  }
}
