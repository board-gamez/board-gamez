import { Core } from '@app/common/schema/core.schema';
import { Meta } from '@app/common/schema/meta.schema';
import {
  AsyncModelFactory,
  Prop,
  Schema,
  SchemaFactory,
} from '@nestjs/mongoose';
import * as MongooseSlugPlugin from 'mongoose-slug-plugin';

@Schema({
  collection: 'artists',
  timestamps: true,
})
export class Artist extends Core {
  @Prop({ trim: true, required: true })
  name: string;

  @Prop({ trim: true, required: true, unique: true })
  slug: string;

  @Prop()
  meta: Meta;

  @Prop({ trim: true })
  link: string;

  @Prop({ trim: true })
  thumbnail: string;
}

export type ArtistDocument = Artist & Document;

export const ArtistSchema = SchemaFactory.createForClass(Artist);

ArtistSchema.plugin(MongooseSlugPlugin, {
  tmpl: '<%=slug%>',
});

export const ArtistModelFactory: AsyncModelFactory = {
  name: Artist.name,

  useFactory: async () => {
    return ArtistSchema;
  },
};
