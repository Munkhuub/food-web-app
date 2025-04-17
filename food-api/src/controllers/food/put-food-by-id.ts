import { foodModel } from "../../models/food.model";

export const putFoodById = async (req, res) => {
  const { foodName, price, image, ingredients, category } = req.body;

  const { id } = req.params;

  const food = await foodModel.findByIdAndUpdate(id, {
    foodName,
    price,
    image,
    ingredients,
    category,
  });
  return res.status(200).json({ food });
};
