import { Core } from '@app/common/schema/core.schema';
import {
  AsyncModelFactory,
  Prop,
  Schema,
  SchemaFactory,
} from '@nestjs/mongoose';
import { Types } from 'mongoose';
import { User } from 'src/user/schema/user.schema';
import { OrderItem } from './order-item.schema';
import { OrderReceiver } from './order-receiver.schema';
import { OrderStatus } from './order-status.enum';

@Schema({
  collection: 'orders',
  timestamps: true,
})
export class Order extends Core {
  @Prop({ type: Types.ObjectId, ref: User.name, required: true })
  _createdBy: Types.ObjectId | User;

  @Prop()
  items: OrderItem[];

  @Prop()
  receiver: OrderReceiver;

  @Prop({
    type: String,
    enum: OrderStatus,
    default: OrderStatus.AwaitingPayment,
  })
  status: OrderStatus;

  @Prop({ min: 0 })
  totalPrice: number;
}

export type OrderDocument = Order & Document;

export const OrderSchema = SchemaFactory.createForClass(Order);

export const OrderModelFactory: AsyncModelFactory = {
  name: Order.name,

  useFactory: async () => {
    return OrderSchema;
  },
};
