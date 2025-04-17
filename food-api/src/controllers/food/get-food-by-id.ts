import { foodModel } from "../../models/food.model";

export const getFoodById = async (req, res) => {
  const { id } = req.params;

  const food = await foodModel.findByIdAndDelete(id);

  return res.status(200).json({ food });
};
