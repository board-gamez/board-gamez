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
import { PublisherService } from './publisher.service';
import {
  GetPublishersInput,
  GetPublishersOutput,
} from './dto/get-publishers.dto';
import { AddPublisherInput, AddPublisherOutput } from './dto/add-publisher.dto';
import { Permission } from 'src/iam/authorization/decorator/permission.decorator';
import {
  EditPublisherInput,
  EditPublisherOutput,
} from './dto/edit-publisher.dto';
import { RemovePublisherOutput } from './dto/remove-publisher.dto';
import { GetPublisherOutput } from './dto/get-publisher.dto';

@Controller('publishers')
export class PublisherController {
  constructor(private readonly publisherService: PublisherService) {}

  @Permission('ADD_PUBLISHER')
  @Post()
  async addPublisher(
    @Body() input: AddPublisherInput,
  ): Promise<AddPublisherOutput> {
    return this.publisherService.addPublisher(input);
  }

  @Permission('EDIT_PUBLISHER')
  @Put(':slug')
  async editPublisher(
    @Param('slug') slug: string,
    @Body() input: EditPublisherInput,
  ): Promise<EditPublisherOutput> {
    return this.publisherService.editPublisher(slug, input);
  }

  @Permission('REMOVE_PUBLISHER')
  @Delete(':slug')
  async removePublisher(
    @Param('slug') slug: string,
  ): Promise<RemovePublisherOutput> {
    return this.publisherService.removePublisher(slug);
  }

  @Get(':slug')
  async getPublisher(@Param('slug') slug: string): Promise<GetPublisherOutput> {
    return this.publisherService.getPublisher(slug);
  }

  @Get()
  async getPublishers(
    @Query() input: GetPublishersInput,
  ): Promise<GetPublishersOutput> {
    return this.publisherService.getPublishers(input);
  }
}
