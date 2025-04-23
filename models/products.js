import { Schema, model, Types } from "mongoose";
import normalize from "normalize-mongoose";

// Define the category enum values
const CategoryEnum = ["Shirt", "Pants", "Shoes", "Accessories"];

const productSchema = new Schema(
  {
    title: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String, required: true },
    // image: {type: String, required: true},
    totalQuantity: { type: Number, required: true },
    pictures: [{ type: String, required: true }],
    averageRating: {
      type: Number,
      default: 0,
    },
    category: {
      type: String,
      enum: CategoryEnum, //Ensure only valid category value
      required: true,
    },
    totalReviews: {
      type: Number,
      default: 0,
    },
    userId: { type: Types.ObjectId, required: true, ref: "User" },
  },
  { timestamps: true }
);

productSchema.plugin(normalize);

export const ProductModel = model("Product", productSchema);
