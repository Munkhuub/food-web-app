import { orderModel } from "../../models/food-order.model";

export const getOrder = async (req, res) => {
  const order = await orderModel.find({});
  return res.status(200).json({ order });
};
