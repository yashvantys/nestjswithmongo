import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserTokenDocument = UserToken & Document;

@Schema()
export class UserToken {
  @Prop({ required: true, unique: true })
  userId: string;
  @Prop({ required: true })
  refreshTokenHash: string;
  @Prop({ default: Date.now })
  expiresAt: Date;
}

export const UserTokenSchema = SchemaFactory.createForClass(UserToken);
