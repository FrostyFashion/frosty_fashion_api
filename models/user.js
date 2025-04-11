import { Schema, model } from "mongoose";
import normalize from "normalize-mongoose";

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: [true, "Product name must be unique"],
    },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: {
      type: String,
      default: "customer",
      enum: ["customer", "vendor", "admin"],
    },
  },
  {
    timestamps: true,
  }
);

userSchema.plugin(normalize);

export const UserModel = model("User", userSchema);
