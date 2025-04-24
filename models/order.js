import { Schema, model, Types } from "mongoose";
import normalize from "normalize-mongoose";

// Define the category enum values
const StatusEnum = ["pending", "confirmed", "shipped"];

const orderSchema = new Schema(
  {
    title: { type: String, required: true },
    items: [
      {
        productId: { type: Types.ObjectId, required: true, ref: "Product" },
        quantity: {type:Number, required: true},
        price: {type: Number, required: true}
      },
    ],
    totalAmount: { type: Number, required: true },

    status: {
      type: String,
      enum: StatusEnum, //Ensure only valid category value
      required: true,
    },
    shippingAddress: {
      street: String,
      city: String,
      country: String,
      postalCode: String
    },
    userId: {
      type: Types.ObjectId,
      required: true,
      ref: "User",
      required: true,
    },
  },

  { timestamps: true }
);

orderSchema.plugin(normalize);

export const OrderModel = model("Order", orderSchema);
