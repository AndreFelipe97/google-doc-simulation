import { File } from './File';
import { getModelForClass } from "@typegoose/typegoose";

export const FileModel = getModelForClass(File);
// add other models here