import bcrypt from "bcrypt";
import config from "config";
import uniqueValidator from "mongoose-unique-validator";
import { Document, HookNextFunction, model, Schema } from "mongoose";
export interface UserDocument extends Document {
    email: string,
    name: string,
    password: string
    createdAt: Date,
    updatedAt: Date,
    comparePassword(password: string): Promise<boolean>
}

const UserSchema = new Schema({
    email: {
        type: "string",
        require: true,
        unique: [true, "Email is not unique"]
    },
    name: {
        type: "string",
        require: true,
    },
    password: {
        type: "string",
        require: true,
    }
}, { timestamps: true })

// pre saved
UserSchema.pre("save", async function (next: HookNextFunction) {
    let user = this as UserDocument;
    if (!user.isModified("password")) return next();
    const salt = await bcrypt.genSalt(config.get("saltWordLength"));
    const hash = await bcrypt.hashSync(user.password, salt);
    user.password = hash;
    return next();
});
UserSchema.plugin(uniqueValidator, { message: 'Error, expected {VALUE} to be unique.' });
//User login
UserSchema.methods.comparePassword = async function (password: string) {
    const user = this as UserDocument
    return bcrypt.compare(password, user.password).catch(e => false)
}
const User = model<UserDocument>("User", UserSchema)

export default User