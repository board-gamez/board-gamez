import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Type, TypeDocument } from './schema/type.schema';
import { Model } from 'mongoose';
import { AddTypeInput, AddTypeOutput } from './dto/add-type.dto';
import { EditTypeInput, EditTypeOutput } from './dto/edit-type.dto';
import { RemoveTypeOutput } from './dto/remove-type.dto';
import { GetTypeOutput } from './dto/get-type.dto';
import { GetTypesInput, GetTypesOutput } from './dto/get-types.dto';
import { TypeFilter } from './type.filter';

@Injectable()
export class TypeService {
  constructor(
    @InjectModel(Type.name)
    private readonly typeModel: Model<TypeDocument>,
  ) {}

  async addType(input: AddTypeInput): Promise<AddTypeOutput> {
    const type = await this.typeModel.create({
      ...input,
    });

    return {
      message: 'type added successfully',
      type,
    };
  }

  async editType(slug: string, input: EditTypeInput): Promise<EditTypeOutput> {
    const type = await this.typeModel.findOneAndUpdate(
      { slug },
      { ...input },
      { new: true },
    );

    if (!type) throw new NotFoundException();

    return {
      message: 'type edited successfully',
      type,
    };
  }

  async removeType(slug: string): Promise<RemoveTypeOutput> {
    const type = await this.typeModel.findOneAndDelete({ slug });

    if (!type) throw new NotFoundException();

    return {
      message: 'type removed successfully',
      type,
    };
  }

  async getType(slug: string): Promise<GetTypeOutput> {
    const type = await this.typeModel.findOne({ slug });

    if (!type) throw new NotFoundException();

    return {
      message: 'type was found successfully',
      type,
    };
  }

  async getTypes(input: GetTypesInput): Promise<GetTypesOutput> {
    const filters = new TypeFilter(input);

    const types = await this.typeModel.find(
      filters.getFilterQuery(),
      {},
      filters.getQueryOptions(),
    );

    const totalCount = await this.typeModel.countDocuments(
      filters.getFilterQuery(),
    );

    return {
      message: 'types was found successfully',
      pagination: { page: input.page, totalCount },
      types,
    };
  }
}
