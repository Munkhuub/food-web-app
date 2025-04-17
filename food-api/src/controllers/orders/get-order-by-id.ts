import { orderModel } from "../../models/food-order.model";

export const getOrderById = async (req, res) => {
  const { id } = req.params;

  const order = await orderModel.findByIdAndDelete(id);

  return res.status(200).json({ order });
};
