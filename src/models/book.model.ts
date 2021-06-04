import { Schema, Document, model, PaginateModel } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";
import { BookTypes } from "@src/types/book.type";
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
    typeOfBook: { type: String, required: true, enum: BookTypes },
    subscribes: { type: [Schema.Types.ObjectId], ref: "User" },
    name: { type: String, required: true },
  },
  { timestamps: true },
);

BookSchema.plugin(mongoosePaginate);
type BookModel<T extends Document> = PaginateModel<T>;
export const Book = model<BookDocument>("Book", BookSchema) as BookModel<BookDocument>;
