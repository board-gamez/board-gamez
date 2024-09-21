import { Prop } from '@nestjs/mongoose';

export class OrderReceiver {
  @Prop({ trim: true })
  name: string;

  @Prop({ trim: true })
  phone: string;

  @Prop({ trim: true })
  address: string;

  @Prop({ trim: true })
  zipcode: string;

  @Prop({ trim: true })
  country: string;

  @Prop({ trim: true })
  state: string;

  @Prop({ trim: true })
  city: string;
}
