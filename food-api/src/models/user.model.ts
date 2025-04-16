import { Schema, model } from "mongoose";

const userSchema = new Schema({
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
  role: {
    type: Enumerator,
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

export const userModel = model("user", userSchema);
