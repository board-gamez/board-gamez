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
import { GameService } from './game.service';
import { GetGamesInput, GetGamesOutput } from './dto/get-games.dto';
import { AddGameInput, AddGameOutput } from './dto/add-game.dto';
import { Permission } from 'src/iam/authorization/decorator/permission.decorator';
import { EditGameInput, EditGameOutput } from './dto/edit-game.dto';
import { RemoveGameOutput } from './dto/remove-game.dto';
import { GetGameOutput } from './dto/get-game.dto';

@Controller('games')
export class GameController {
  constructor(private readonly gameService: GameService) {}

  @Permission('ADD_GAME')
  @Post()
  async addGame(@Body() input: AddGameInput): Promise<AddGameOutput> {
    return this.gameService.addGame(input);
  }

  @Permission('EDIT_GAME')
  @Put(':slug')
  async editGame(
    @Param('slug') slug: string,
    @Body() input: EditGameInput,
  ): Promise<EditGameOutput> {
    return this.gameService.editGame(slug, input);
  }

  @Permission('REMOVE_GAME')
  @Delete(':slug')
  async removeGame(@Param('slug') slug: string): Promise<RemoveGameOutput> {
    return this.gameService.removeGame(slug);
  }

  @Get(':slug')
  async getGame(@Param('slug') slug: string): Promise<GetGameOutput> {
    return this.gameService.getGame(slug);
  }

  @Get()
  async getGames(@Query() input: GetGamesInput): Promise<GetGamesOutput> {
    return this.gameService.getGames(input);
  }
}
