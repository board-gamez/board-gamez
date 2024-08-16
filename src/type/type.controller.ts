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
import { TypeService } from './type.service';
import { GetTypesInput, GetTypesOutput } from './dto/get-types.dto';
import { AddTypeInput, AddTypeOutput } from './dto/add-type.dto';
import { Permission } from 'src/iam/authorization/decorator/permission.decorator';
import { EditTypeInput, EditTypeOutput } from './dto/edit-type.dto';
import { RemoveTypeOutput } from './dto/remove-type.dto';
import { GetTypeOutput } from './dto/get-type.dto';

@Controller('types')
export class TypeController {
  constructor(private readonly typeService: TypeService) {}

  @Permission('ADD_TYPE')
  @Post()
  async addType(@Body() input: AddTypeInput): Promise<AddTypeOutput> {
    return this.typeService.addType(input);
  }

  @Permission('EDIT_TYPE')
  @Put(':slug')
  async editType(
    @Param('slug') slug: string,
    @Body() input: EditTypeInput,
  ): Promise<EditTypeOutput> {
    return this.typeService.editType(slug, input);
  }

  @Permission('REMOVE_TYPE')
  @Delete(':slug')
  async removeType(@Param('slug') slug: string): Promise<RemoveTypeOutput> {
    return this.typeService.removeType(slug);
  }

  @Get(':slug')
  async getType(@Param('slug') slug: string): Promise<GetTypeOutput> {
    return this.typeService.getType(slug);
  }

  @Get()
  async getTypes(@Query() input: GetTypesInput): Promise<GetTypesOutput> {
    return this.typeService.getTypes(input);
  }
}
