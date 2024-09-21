import { CoreOutput } from '@app/common/dto/output.dto';
import { Order } from '../schema/order.schema';
import { Types } from 'mongoose';

class Item {
  _product: Types.ObjectId;
  quantity: number;
}

class Receiver {
  name: string;
  phone: string;
  address: string;
  zipcode: string;
  country: string;
  state: string;
  city: string;
}

export class AddOrderInput {
  items: Item[];
  receiver: Receiver;
}

export class AddOrderOutput extends CoreOutput {
  paymentUrl: string;
  order: Order;
}
