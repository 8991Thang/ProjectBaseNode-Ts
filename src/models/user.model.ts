import bcrypt from "bcrypt";
import config from "config";
import { Document, HookNextFunction, model, Schema } from "mongoose";

export interface UserDocument extends Document {
  email: string;
  name: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
  hobby: string[];
  age: number;
  address: string;
  comparePassword(password: string): Promise<boolean>;
}

const UserSchema = new Schema(
  {
    email: {
      type: "string",
      require: true,
      unique: true,
    },
    name: {
      type: "string",
      require: true,
    },
    password: {
      type: "string",
      require: true,
    },
    age: { type: Number, min: 16, max: 70, default: null },
    address: { type: String, default: null },
    hobby: { type: [Schema.Types.ObjectId], ref: "Hobby" },
  },
  { timestamps: true },
);

// pre saved.
UserSchema.pre("save", async function (next: HookNextFunction) {
  const user = this as UserDocument;
  if (!user.isModified("password")) return next();
  const salt = await bcrypt.genSalt(config.get("saltWordLength"));
  const hash = bcrypt.hashSync(user.password, salt);
  user.password = hash;
  return next();
});
// User login
UserSchema.methods.comparePassword = async function (password: string) {
  const user = this as UserDocument;
  return bcrypt.compare(password, user.password).catch(() => false);
};
const User = model<UserDocument>("User", UserSchema);

export default User;
