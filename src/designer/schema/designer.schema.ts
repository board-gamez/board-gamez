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
  collection: 'designers',
  timestamps: true,
})
export class Designer extends Core {
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

export type DesignerDocument = Designer & Document;

export const DesignerSchema = SchemaFactory.createForClass(Designer);

DesignerSchema.plugin(MongooseSlugPlugin, {
  tmpl: '<%=slug%>',
});

export const DesignerModelFactory: AsyncModelFactory = {
  name: Designer.name,

  useFactory: async () => {
    return DesignerSchema;
  },
};
