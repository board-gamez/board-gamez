import { Prop } from '@nestjs/mongoose';
import { Types } from 'mongoose';

export class Core {
  _id: Types.ObjectId;

  @Prop()
  createdAt: Date;

  @Prop()
  updatedAt: Date;
}
