import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export type UserDocument = User & Document;

enum RoleType {
  admin = 'admin',
  user = 'user',
}

@Schema()
export class User {
  @Prop({ required: true, unique: true })
  username: string;

  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ default: '' })
  contact_info: string;

  @Prop({ default: '' })
  identification: string;

  @Prop({ default: RoleType.user  })
  role: RoleType;

  @Prop({ default: ''})
  bio: string;

  @Prop({ type: [String] })
  groups: string[];

  @Prop({ default: 'default' })
  company: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
