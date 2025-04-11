import { Schema, model, Types } from "mongoose";
import normalize from "normalize-mongoose";

const productSchema = new Schema(
  {
    title: { type: String, required: true, unique: true },
    price: { type: Number, required: true },
    description: { type: String, required: true },
    image: {type:String, required: true},
    quantity: { type: Number, required: true },
    // picture: [{ type: String, required: true }],
    // userId: { type: Types.ObjectId, required: true, ref: "User" },
  },
  { timestamps: true }
);

productSchema.plugin(normalize);

export const ProductModel = model("Product", productSchema);
