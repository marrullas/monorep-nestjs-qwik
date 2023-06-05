import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";


export type ProducsDocument = Product & Document;

@Schema()
export class Product {
  @Prop({ unique: true })
  name: string;

  @Prop()
  description: string;

  @Prop()
  price: number;

  @Prop({ default: 'http://placehold.it/200x200'})
  image: string;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
