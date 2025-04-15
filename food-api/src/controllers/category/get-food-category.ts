import { foodModel } from "../../models/food.model";

export const getFoodCategory = async (req, res) => {
  const categories = await foodModel.find({});
  return res.status(200).json({ categories });
};
