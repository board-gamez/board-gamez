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
  collection: 'mechanisms',
  timestamps: true,
})
export class Mechanism extends Core {
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

export type MechanismDocument = Mechanism & Document;

export const MechanismSchema = SchemaFactory.createForClass(Mechanism);

MechanismSchema.plugin(MongooseSlugPlugin, {
  tmpl: '<%=slug%>',
});

export const MechanismModelFactory: AsyncModelFactory = {
  name: Mechanism.name,

  useFactory: async () => {
    return MechanismSchema;
  },
};
