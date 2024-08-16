import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Designer, DesignerDocument } from './schema/designer.schema';
import { Model } from 'mongoose';
import { AddDesignerInput, AddDesignerOutput } from './dto/add-designer.dto';
import { EditDesignerInput, EditDesignerOutput } from './dto/edit-designer.dto';
import { RemoveDesignerOutput } from './dto/remove-designer.dto';
import { GetDesignerOutput } from './dto/get-designer.dto';
import { GetDesignersInput, GetDesignersOutput } from './dto/get-designers.dto';
import { DesignerFilter } from './designer.filter';

@Injectable()
export class DesignerService {
  constructor(
    @InjectModel(Designer.name)
    private readonly designerModel: Model<DesignerDocument>,
  ) {}

  async addDesigner(input: AddDesignerInput): Promise<AddDesignerOutput> {
    const designer = await this.designerModel.create({
      ...input,
    });

    return {
      message: 'designer added successfully',
      designer,
    };
  }

  async editDesigner(
    slug: string,
    input: EditDesignerInput,
  ): Promise<EditDesignerOutput> {
    const designer = await this.designerModel.findOneAndUpdate(
      { slug },
      { ...input },
      { new: true },
    );

    if (!designer) throw new NotFoundException();

    return {
      message: 'designer edited successfully',
      designer,
    };
  }

  async removeDesigner(slug: string): Promise<RemoveDesignerOutput> {
    const designer = await this.designerModel.findOneAndDelete({ slug });

    if (!designer) throw new NotFoundException();

    return {
      message: 'designer removed successfully',
      designer,
    };
  }

  async getDesigner(slug: string): Promise<GetDesignerOutput> {
    const designer = await this.designerModel.findOne({ slug });

    if (!designer) throw new NotFoundException();

    return {
      message: 'designer was found successfully',
      designer,
    };
  }

  async getDesigners(input: GetDesignersInput): Promise<GetDesignersOutput> {
    const filters = new DesignerFilter(input);

    const designers = await this.designerModel.find(
      filters.getFilterQuery(),
      {},
      filters.getQueryOptions(),
    );

    const totalCount = await this.designerModel.countDocuments(
      filters.getFilterQuery(),
    );

    return {
      message: 'designers was found successfully',
      pagination: { page: input.page, totalCount },
      designers,
    };
  }
}
