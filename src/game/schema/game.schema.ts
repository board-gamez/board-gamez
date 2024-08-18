import { Core } from '@app/common/schema/core.schema';
import { Meta } from '@app/common/schema/meta.schema';
import {
  AsyncModelFactory,
  Prop,
  Schema,
  SchemaFactory,
} from '@nestjs/mongoose';
import { Types } from 'mongoose';
import * as MongooseSlugPlugin from 'mongoose-slug-plugin';
import { Artist } from 'src/artist/schema/artist.schema';
import { Category } from 'src/category/schema/category.schema';
import { Designer } from 'src/designer/schema/designer.schema';
import { Mechanism } from 'src/mechanism/schema/mechanism.schema';
import { Publisher } from 'src/publisher/schema/publisher.schema';
import { Type } from 'src/type/schema/type.schema';

@Schema({
  collection: 'games',
  timestamps: true,
})
export class Game extends Core {
  @Prop({ trim: true, required: true })
  title: string;

  @Prop({ trim: true, required: true })
  content: string;

  @Prop({ trim: true, required: true, unique: true })
  slug: string;

  @Prop({ type: [{ type: Types.ObjectId, ref: Type.name }] })
  _types: Types.ObjectId[] | Type[];

  @Prop({ type: [{ type: Types.ObjectId, ref: Category.name }] })
  _categories: Types.ObjectId[] | Category[];

  @Prop({ type: [{ type: Types.ObjectId, ref: Mechanism.name }] })
  _mechanisms: Types.ObjectId[] | Mechanism[];

  @Prop({ type: [{ type: Types.ObjectId, ref: Publisher.name }] })
  _publishers: Types.ObjectId[] | Publisher[];

  @Prop({ type: [{ type: Types.ObjectId, ref: Designer.name }] })
  _designers: Types.ObjectId[] | Designer[];

  @Prop({ type: [{ type: Types.ObjectId, ref: Artist.name }] })
  _artists: Types.ObjectId[] | Artist[];

  @Prop({ min: 1 })
  minPlayers: number;

  @Prop({ min: 1 })
  maxPlayers: number;

  @Prop({ min: 0 })
  minPlayingTime: number;

  @Prop({ min: 0 })
  maxPlayingTime: number;

  @Prop({ min: 0 })
  age: number;

  @Prop({ min: 0 })
  weight: number;

  @Prop({ trim: true })
  language: string;

  @Prop()
  releaseDate?: Date;

  @Prop({ min: 0 })
  price: number;

  @Prop({ min: 0 })
  discountPrice: number;

  @Prop({ min: 0 })
  stockQuantity: number;

  @Prop()
  meta: Meta;

  @Prop()
  images: string[];
}

export type GameDocument = Game & Document;

export const GameSchema = SchemaFactory.createForClass(Game);

GameSchema.plugin(MongooseSlugPlugin, {
  tmpl: '<%=slug%>',
});

export const GameModelFactory: AsyncModelFactory = {
  name: Game.name,

  useFactory: async () => {
    return GameSchema;
  },
};
