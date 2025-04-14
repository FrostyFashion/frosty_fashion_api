import { Schema, model, Types } from "mongoose";
import normalize from "normalize-mongoose";

const userSchema = new Schema({
  userName: { type: String},
  email: { type: String, unique: true },
  password: { type: String },
  role: {
    type: String,
    default: "customer",
    enum: ["vendor", "customer", "admin", "superadmin"],
  },
});

userSchema.plugin(normalize);

export const UserModel = model("User", userSchema);
