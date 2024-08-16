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
import { DesignerService } from './designer.service';
import { GetDesignersInput, GetDesignersOutput } from './dto/get-designers.dto';
import { AddDesignerInput, AddDesignerOutput } from './dto/add-designer.dto';
import { Permission } from 'src/iam/authorization/decorator/permission.decorator';
import { EditDesignerInput, EditDesignerOutput } from './dto/edit-designer.dto';
import { RemoveDesignerOutput } from './dto/remove-designer.dto';
import { GetDesignerOutput } from './dto/get-designer.dto';

@Controller('designers')
export class DesignerController {
  constructor(private readonly designerService: DesignerService) {}

  @Permission('ADD_PUBLISHER')
  @Post()
  async addDesigner(
    @Body() input: AddDesignerInput,
  ): Promise<AddDesignerOutput> {
    return this.designerService.addDesigner(input);
  }

  @Permission('EDIT_PUBLISHER')
  @Put(':slug')
  async editDesigner(
    @Param('slug') slug: string,
    @Body() input: EditDesignerInput,
  ): Promise<EditDesignerOutput> {
    return this.designerService.editDesigner(slug, input);
  }

  @Permission('REMOVE_PUBLISHER')
  @Delete(':slug')
  async removeDesigner(
    @Param('slug') slug: string,
  ): Promise<RemoveDesignerOutput> {
    return this.designerService.removeDesigner(slug);
  }

  @Get(':slug')
  async getDesigner(@Param('slug') slug: string): Promise<GetDesignerOutput> {
    return this.designerService.getDesigner(slug);
  }

  @Get()
  async getDesigners(
    @Query() input: GetDesignersInput,
  ): Promise<GetDesignersOutput> {
    return this.designerService.getDesigners(input);
  }
}
