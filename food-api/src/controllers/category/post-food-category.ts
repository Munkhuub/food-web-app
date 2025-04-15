import { foodModel } from "../../models/food.model";

export const postFoodCategory = async (req, res) => {
  const { categoryName } = req.body;
  await foodModel.create({ categoryName });
  return res.status(201).json({ message: "Category nemegdsen" });
};
