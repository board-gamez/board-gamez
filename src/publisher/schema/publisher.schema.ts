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
  collection: 'publishers',
  timestamps: true,
})
export class Publisher extends Core {
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

export type PublisherDocument = Publisher & Document;

export const PublisherSchema = SchemaFactory.createForClass(Publisher);

PublisherSchema.plugin(MongooseSlugPlugin, {
  tmpl: '<%=slug%>',
});

export const PublisherModelFactory: AsyncModelFactory = {
  name: Publisher.name,

  useFactory: async () => {
    return PublisherSchema;
  },
};
