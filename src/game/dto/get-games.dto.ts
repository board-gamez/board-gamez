import { CoreOutput } from '@app/common/dto/output.dto';
import { Game } from '../schema/game.schema';
import { CoreFilter } from '@app/common/dto/filter.dto';
import { CorePagination } from '@app/common/dto/pagination.dto';
import { Types } from 'mongoose';

export class GetGamesInput extends CoreFilter {
  _types: Types.ObjectId[];
  _categories: Types.ObjectId[];
  _mechanisms: Types.ObjectId[];
  _publishers: Types.ObjectId[];
  _designers: Types.ObjectId[];
  _artists: Types.ObjectId[];
  minPlayers: number;
  maxPlayers: number;
  minPlayingTime: number;
  maxPlayingTime: number;
  age: number;
  weight: number;
  price: number;
  discountPrice: number;
}

export class GetGamesOutput extends CoreOutput {
  pagination?: CorePagination;
  games?: Game[];
}
