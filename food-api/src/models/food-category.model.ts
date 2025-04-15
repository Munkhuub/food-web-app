import { Schema, model } from "mongoose";

const foodSchema = new Schema({
  _id: {
    type: String,
    required: true,
  },
  categoryName: {
    type: Number,
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
