import { orderModel } from "../../models/food-order.model";

export const putOrderById = async (req, res) => {
  const { foodName, price, image, ingredients, category } = req.body;

  const { id } = req.params;

  const order = await orderModel.findByIdAndUpdate(id, {
    foodName,
    price,
    image,
    ingredients,
    category,
  });
  return res.status(200).json({ order });
};
