
import { Schema, Document, model } from "mongoose";
import { UserDocument } from "./user.model";

export interface BookDocument extends Document {
    user: UserDocument["_id"],
    discription: string,
    typeOfBook: string
    auth: string,
    updateAt: Date,
    createdAt: Date
}

const BookSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: "User" },
    discription: { type: String, required: true },
    typeOfBook: { type: String, default: "any" },
    author: { type: String },
}, { timestamps: true })



export const Book = model<BookDocument>("Book", BookSchema)