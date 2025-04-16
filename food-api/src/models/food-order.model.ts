import { Schema, model } from "mongoose";

const foodSchema = new Schema({
  _id: {
    type: String,
    required: true,
  },
  user: {
    type: Number,
    required: true,
  },
  image: {
    type: String,
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
  foodOrderItems: {
    type: [],
    required: true,
  },
  status: {
    type: Enumerator,
    required: true,
  },
});

export const foodModel = model("food", foodSchema);
