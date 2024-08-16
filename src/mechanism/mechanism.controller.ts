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
import { MechanismService } from './mechanism.service';
import {
  GetMechanismsInput,
  GetMechanismsOutput,
} from './dto/get-mechanisms.dto';
import { AddMechanismInput, AddMechanismOutput } from './dto/add-mechanism.dto';
import { Permission } from 'src/iam/authorization/decorator/permission.decorator';
import {
  EditMechanismInput,
  EditMechanismOutput,
} from './dto/edit-mechanism.dto';
import { RemoveMechanismOutput } from './dto/remove-mechanism.dto';
import { GetMechanismOutput } from './dto/get-mechanism.dto';

@Controller('mechanisms')
export class MechanismController {
  constructor(private readonly mechanismService: MechanismService) {}

  @Permission('ADD_MECHANISM')
  @Post()
  async addMechanism(
    @Body() input: AddMechanismInput,
  ): Promise<AddMechanismOutput> {
    return this.mechanismService.addMechanism(input);
  }

  @Permission('EDIT_MECHANISM')
  @Put(':slug')
  async editMechanism(
    @Param('slug') slug: string,
    @Body() input: EditMechanismInput,
  ): Promise<EditMechanismOutput> {
    return this.mechanismService.editMechanism(slug, input);
  }

  @Permission('REMOVE_MECHANISM')
  @Delete(':slug')
  async removeMechanism(
    @Param('slug') slug: string,
  ): Promise<RemoveMechanismOutput> {
    return this.mechanismService.removeMechanism(slug);
  }

  @Get(':slug')
  async getMechanism(@Param('slug') slug: string): Promise<GetMechanismOutput> {
    return this.mechanismService.getMechanism(slug);
  }

  @Get()
  async getMechanisms(
    @Query() input: GetMechanismsInput,
  ): Promise<GetMechanismsOutput> {
    return this.mechanismService.getMechanisms(input);
  }
}
