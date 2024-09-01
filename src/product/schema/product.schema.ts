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
  collection: 'products',
  timestamps: true,
})
export class Product extends Core {
  @Prop({ trim: true, required: true })
  title: string;

  @Prop({ trim: true, required: true })
  content: string;

  @Prop({ trim: true, required: true, unique: true })
  slug: string;

  @Prop({ min: 0 })
  price: number;

  @Prop({ min: 0 })
  quantity: number;

  @Prop()
  meta: Meta;

  @Prop()
  thumbnail: string;
}

export type ProductDocument = Product & Document;

export const ProductSchema = SchemaFactory.createForClass(Product);

ProductSchema.plugin(MongooseSlugPlugin, {
  tmpl: '<%=slug%>',
});

export const ProductModelFactory: AsyncModelFactory = {
  name: Product.name,
  useFactory: async () => {
    return ProductSchema;
  },
};
