import { Schema, model, Types } from "mongoose";
import normalize from "normalize-mongoose";

const cartSchema = new Schema(
  {
    userId: { type: Types.ObjectId, required: true, ref: "User" },
    items: [
      {
        productId: { type: Types.ObjectId, required: true, ref: "Product" },
        quantity: Number,
      },
    ],
    totalPrice: {
      type: Number,
      default: 0,
      min: [0, "Total price cannot be negative"],
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

cartSchema.plugin(normalize);

export const CartModel = model("Cart", cartSchema);