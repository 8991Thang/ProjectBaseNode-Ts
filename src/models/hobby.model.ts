import { model, Schema, Document, PaginateModel } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";
import { listHobbyType } from "@src/types/hobby.type";

export interface HobbyDocument extends Document {
  name: string;
}
const HobbySchema = new Schema(
  {
    name: { type: String, required: true },
    typeOfHobby: { type: String, required: true, enum: listHobbyType },
  },
  { timestamps: true },
);

HobbySchema.plugin(mongoosePaginate);

type HobbyModel<T extends Document> = PaginateModel<T>;

const Hobby = model<HobbyDocument>("Hobby", HobbySchema) as HobbyModel<HobbyDocument>;

export default Hobby;
