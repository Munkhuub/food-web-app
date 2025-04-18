import { orderModel } from "../../models/food-order.model";

export const getOrder = async (req, res) => {
  try {
    const order = await orderModel.find({});
    return res.status(200).json({ order });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};
