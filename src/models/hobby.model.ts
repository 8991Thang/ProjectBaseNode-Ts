import { listHobbyType } from "@src/types/hobby.type";
import { model, Schema,Document, PaginateModel } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2"
export interface HobbyDocument extends Document{
        name: string;
}
const HobbySchema = new Schema({
    name: {type:String, required:true},
    typeOfHobby: {type:String, required:true, enum: listHobbyType}
},{timestamps:true})

HobbySchema.plugin(mongoosePaginate)

interface HobbyModel<T extends Document> extends PaginateModel<T> {}

const Hobby = model<HobbyDocument>("Hobby",HobbySchema) as HobbyModel<HobbyDocument>

export default Hobby