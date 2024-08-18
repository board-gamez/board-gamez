import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Game, GameDocument } from './schema/game.schema';
import { Model } from 'mongoose';
import { AddGameInput, AddGameOutput } from './dto/add-game.dto';
import { EditGameInput, EditGameOutput } from './dto/edit-game.dto';
import { RemoveGameOutput } from './dto/remove-game.dto';
import { GetGameOutput } from './dto/get-game.dto';
import { GetGamesInput, GetGamesOutput } from './dto/get-games.dto';
import { GameFilter } from './game.filter';

@Injectable()
export class GameService {
  constructor(
    @InjectModel(Game.name)
    private readonly gameModel: Model<GameDocument>,
  ) {}

  async addGame(input: AddGameInput): Promise<AddGameOutput> {
    const game = await this.gameModel.create({
      ...input,
    });

    return {
      message: 'game added successfully',
      game,
    };
  }

  async editGame(slug: string, input: EditGameInput): Promise<EditGameOutput> {
    const game = await this.gameModel.findOneAndUpdate(
      { slug },
      { ...input },
      { new: true },
    );

    if (!game) throw new NotFoundException();

    return {
      message: 'game edited successfully',
      game,
    };
  }

  async removeGame(slug: string): Promise<RemoveGameOutput> {
    const game = await this.gameModel.findOneAndDelete({ slug });

    if (!game) throw new NotFoundException();

    return {
      message: 'game removed successfully',
      game,
    };
  }

  async getGame(slug: string): Promise<GetGameOutput> {
    const game = await this.gameModel.findOne({ slug });

    if (!game) throw new NotFoundException();

    return {
      message: 'game was found successfully',
      game,
    };
  }

  async getGames(input: GetGamesInput): Promise<GetGamesOutput> {
    const filters = new GameFilter(input);

    const games = await this.gameModel.find(
      filters.getFilterQuery(),
      {},
      filters.getQueryOptions(),
    );

    const totalCount = await this.gameModel.countDocuments(
      filters.getFilterQuery(),
    );

    return {
      message: 'games was found successfully',
      pagination: { page: input.page, totalCount },
      games,
    };
  }
}
