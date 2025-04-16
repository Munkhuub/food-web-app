import { foodModel } from "../../models/food.model";

export const patchFoodById = async (req, res) => {
  const { foodName } = req.body;

  const { id } = req.params;

  const category = await foodModel.findByIdAndUpdate(id, {
    foodName,
  });
};
