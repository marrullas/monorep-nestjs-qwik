import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";


export type AuthDocumento = Auth & Document;

@Schema()
export class Auth {
  @Prop()
  username: string;

  @Prop()
  email: string;

  @Prop()
  password: string;
}

export const AuthDocumento = SchemaFactory.createForClass(Auth);
