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
  collection: 'types',
  timestamps: true,
})
export class Type extends Core {
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

export type TypeDocument = Type & Document;

export const TypeSchema = SchemaFactory.createForClass(Type);

TypeSchema.plugin(MongooseSlugPlugin, {
  tmpl: '<%=slug%>',
});

export const TypeModelFactory: AsyncModelFactory = {
  name: Type.name,

  useFactory: async () => {
    return TypeSchema;
  },
};
