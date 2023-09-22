import { prop } from "@typegoose/typegoose";
import { nanoid } from "nanoid";

export class File {
  @prop({ default: () => nanoid(9) })
  _id: string;

  @prop()
  title: string;

  @prop()
  slug: string;

  @prop({ default: () => new Date() })
  createdAt: Date;
}