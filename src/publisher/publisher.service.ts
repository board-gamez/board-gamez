import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Publisher, PublisherDocument } from './schema/publisher.schema';
import { Model } from 'mongoose';
import { AddPublisherInput, AddPublisherOutput } from './dto/add-publisher.dto';
import {
  EditPublisherInput,
  EditPublisherOutput,
} from './dto/edit-publisher.dto';
import { RemovePublisherOutput } from './dto/remove-publisher.dto';
import { GetPublisherOutput } from './dto/get-publisher.dto';
import {
  GetPublishersInput,
  GetPublishersOutput,
} from './dto/get-publishers.dto';
import { PublisherFilter } from './publisher.filter';

@Injectable()
export class PublisherService {
  constructor(
    @InjectModel(Publisher.name)
    private readonly publisherModel: Model<PublisherDocument>,
  ) {}

  async addPublisher(input: AddPublisherInput): Promise<AddPublisherOutput> {
    const publisher = await this.publisherModel.create({
      ...input,
    });

    return {
      message: 'publisher added successfully',
      publisher,
    };
  }

  async editPublisher(
    slug: string,
    input: EditPublisherInput,
  ): Promise<EditPublisherOutput> {
    const publisher = await this.publisherModel.findOneAndUpdate(
      { slug },
      { ...input },
      { new: true },
    );

    if (!publisher) throw new NotFoundException();

    return {
      message: 'publisher edited successfully',
      publisher,
    };
  }

  async removePublisher(slug: string): Promise<RemovePublisherOutput> {
    const publisher = await this.publisherModel.findOneAndDelete({ slug });

    if (!publisher) throw new NotFoundException();

    return {
      message: 'publisher removed successfully',
      publisher,
    };
  }

  async getPublisher(slug: string): Promise<GetPublisherOutput> {
    const publisher = await this.publisherModel.findOne({ slug });

    if (!publisher) throw new NotFoundException();

    return {
      message: 'publisher was found successfully',
      publisher,
    };
  }

  async getPublishers(input: GetPublishersInput): Promise<GetPublishersOutput> {
    const filters = new PublisherFilter(input);

    const publishers = await this.publisherModel.find(
      filters.getFilterQuery(),
      {},
      filters.getQueryOptions(),
    );

    const totalCount = await this.publisherModel.countDocuments(
      filters.getFilterQuery(),
    );

    return {
      message: 'publishers was found successfully',
      pagination: { page: input.page, totalCount },
      publishers,
    };
  }
}
