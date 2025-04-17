import { orderModel } from "../../models/food-order.model";

export const deleteOrderById = async (req, res) => {
  const { id } = req.params;

  const order = await orderModel.findByIdAndDelete(id);

  return res.status(200).json({ order });
};
