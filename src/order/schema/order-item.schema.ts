import { Prop } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import { Product } from 'src/product/schema/product.schema';

export class OrderItem {
  @Prop({ type: Types.ObjectId, ref: Product.name, required: true })
  _product: Types.ObjectId | Product;

  @Prop({ min: 1 })
  quantity: number;
}
