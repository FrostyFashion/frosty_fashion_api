import { Schema, model, Types } from "mongoose";
import normalize from "normalize-mongoose";

const reviewSchema = new Schema(
  {
    rating: { type: Number, required: true, min: 1, max: 5 },
    comment: { type: String },
    userId: { type: Types.ObjectId, required: true, ref: "User" },
    productId: { type: Types.ObjectId, required: true, ref: "Product" },
  },
  {
    timestamps: true,
  }
);

reviewSchema.plugin(normalize);

export const ReviewModel = model("Review", reviewSchema);
