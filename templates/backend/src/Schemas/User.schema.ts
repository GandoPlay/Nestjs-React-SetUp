import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  @Prop({ type: String,unique: true,
  })
  name: string;

@Prop()
    hash: string
}



export const UserSchema = SchemaFactory.createForClass(User);