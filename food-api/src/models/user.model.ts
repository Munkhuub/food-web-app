import { Schema, model } from "mongoose";

const foodSchema = new Schema({
  _id: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: Date,
    required: true,
  },
  address: {
    type: Date,
    required: true,
  },
  orderedFoods: {
    type: String,
    required: true,
  },
  ttl: {
    type: Date,
    required: true,
  },
  isVerified: {
    type: Boolean,
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

export const foodModel = model("food", foodSchema);
