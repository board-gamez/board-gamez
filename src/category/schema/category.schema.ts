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
  collection: 'categories',
  timestamps: true,
})
export class Category extends Core {
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

export type CategoryDocument = Category & Document;

export const CategorySchema = SchemaFactory.createForClass(Category);

CategorySchema.plugin(MongooseSlugPlugin, {
  tmpl: '<%=slug%>',
});

export const CategoryModelFactory: AsyncModelFactory = {
  name: Category.name,

  useFactory: async () => {
    return CategorySchema;
  },
};
