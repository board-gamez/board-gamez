import { Core } from '@app/common/schema/core.schema';
import {
  AsyncModelFactory,
  Prop,
  Schema,
  SchemaFactory,
} from '@nestjs/mongoose';
import { Role } from 'src/iam/authorization/constant/role.constant';

@Schema({
  collection: 'users',
  timestamps: true,
})
export class User extends Core {
  @Prop({ trim: true, required: true, default: 'No Name' })
  name: string;

  @Prop({ trim: true, required: true, unique: true })
  phone: string;

  @Prop({ type: String, enum: Role, default: Role.CUSTOMER })
  role: Role;

  @Prop({ default: false })
  isVerified: boolean;

  @Prop()
  verificationCode?: string;

  @Prop()
  verificationExpireDate?: Date;
}

export type UserDocument = User & Document;

export const UserSchema = SchemaFactory.createForClass(User);

export const UserModelFactory: AsyncModelFactory = {
  name: User.name,

  useFactory: async () => {
    return UserSchema;
  },
};
