import { BookTypes } from "@src/types/book.type";
import { Schema, Document, model } from "mongoose";
import { UserDocument } from "./user.model";

export interface BookDocument extends Document {
  author: UserDocument["_id"];
  description: string;
  typeOfBook: string;
  auth: string;
  updateAt: Date;
  createdAt: Date;
  name: string;
  subscribes: [UserDocument["_id"]];
}
const BookSchema = new Schema(
  {
    author: { type: Schema.Types.ObjectId, ref: "User" },
    description: { type: String, required: true },
    typeOfBook: { type: String, required: true, enum : BookTypes},
    subscribes: { type: [Schema.Types.ObjectId], ref: "User" },
    name: { type: String, required: true },
  },
  { timestamps: true },
);
export const Book = model<BookDocument>("Book", BookSchema);
