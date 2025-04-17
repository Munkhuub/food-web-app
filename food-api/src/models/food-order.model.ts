import { Schema, model } from "mongoose";

const OrderItemSchema = new Schema({
  food: {
    type: Schema.Types.ObjectId,
    ref: "food",
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
});
const orderSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  totalPrice: {
    type: Number,
    required: true,
  },
  foodOrderItems: {
    type: [OrderItemSchema],
    default: [],
    required: true,
  },
  status: {
    type: String,
    enum: ["PENDING", "CANCELED", "DELIVERED"],
    default: "PENDING",
    required: true,
  },
  createdAt: {
    type: Date,
    required: true,
  },
  udatedAt: {
    type: Date,
    required: true,
  },
});

export const orderModel = model("order", orderSchema);
