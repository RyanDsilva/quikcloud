import { model, Schema, Document } from "mongoose";
import { hash } from "bcryptjs";
import { HASH_KEY } from "../utils/env";

interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  authority: string;
}

const userSchema: Schema<IUser> = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
  },
  authority: {
    type: String,
    default: "USER",
  },
});

userSchema.pre("save", async function (next) {
  const user = this;
  if (user.isModified("password")) {
    user.password = await hash(user.password, HASH_KEY);
  }
  next();
});

export const User = model<IUser>("User", userSchema);
