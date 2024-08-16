import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Mechanism, MechanismDocument } from './schema/mechanism.schema';
import { Model } from 'mongoose';
import { AddMechanismInput, AddMechanismOutput } from './dto/add-mechanism.dto';
import {
  EditMechanismInput,
  EditMechanismOutput,
} from './dto/edit-mechanism.dto';
import { RemoveMechanismOutput } from './dto/remove-mechanism.dto';
import { GetMechanismOutput } from './dto/get-mechanism.dto';
import {
  GetMechanismsInput,
  GetMechanismsOutput,
} from './dto/get-mechanisms.dto';
import { MechanismFilter } from './mechanism.filter';

@Injectable()
export class MechanismService {
  constructor(
    @InjectModel(Mechanism.name)
    private readonly mechanismModel: Model<MechanismDocument>,
  ) {}

  async addMechanism(input: AddMechanismInput): Promise<AddMechanismOutput> {
    const mechanism = await this.mechanismModel.create({
      ...input,
    });

    return {
      message: 'mechanism added successfully',
      mechanism,
    };
  }

  async editMechanism(
    slug: string,
    input: EditMechanismInput,
  ): Promise<EditMechanismOutput> {
    const mechanism = await this.mechanismModel.findOneAndUpdate(
      { slug },
      { ...input },
      { new: true },
    );

    if (!mechanism) throw new NotFoundException();

    return {
      message: 'mechanism edited successfully',
      mechanism,
    };
  }

  async removeMechanism(slug: string): Promise<RemoveMechanismOutput> {
    const mechanism = await this.mechanismModel.findOneAndDelete({ slug });

    if (!mechanism) throw new NotFoundException();

    return {
      message: 'mechanism removed successfully',
      mechanism,
    };
  }

  async getMechanism(slug: string): Promise<GetMechanismOutput> {
    const mechanism = await this.mechanismModel.findOne({ slug });

    if (!mechanism) throw new NotFoundException();

    return {
      message: 'mechanism was found successfully',
      mechanism,
    };
  }

  async getMechanisms(input: GetMechanismsInput): Promise<GetMechanismsOutput> {
    const filters = new MechanismFilter(input);

    const mechanisms = await this.mechanismModel.find(
      filters.getFilterQuery(),
      {},
      filters.getQueryOptions(),
    );

    const totalCount = await this.mechanismModel.countDocuments(
      filters.getFilterQuery(),
    );

    return {
      message: 'mechanisms was found successfully',
      pagination: { page: input.page, totalCount },
      mechanisms,
    };
  }
}
