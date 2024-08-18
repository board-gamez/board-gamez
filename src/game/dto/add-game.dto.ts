import { CoreOutput } from '@app/common/dto/output.dto';
import { Game } from '../schema/game.schema';
import { Meta } from '@app/common/schema/meta.schema';
import { Types } from 'mongoose';

export class AddGameInput {
  title: string;
  content: string;
  slug: string;
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
  language: string;
  releaseDate?: Date;
  price: number;
  discountPrice: number;
  stockQuantity: number;
  meta: Meta;
  images: string[];
}

export class AddGameOutput extends CoreOutput {
  game?: Game;
}
