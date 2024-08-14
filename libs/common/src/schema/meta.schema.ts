import { Prop } from '@nestjs/mongoose';

export class Meta {
  @Prop({ trim: true })
  title: string;

  @Prop({ trim: true })
  description: string;

  @Prop({ type: [String], trim: true })
  keywords: string[];
}
