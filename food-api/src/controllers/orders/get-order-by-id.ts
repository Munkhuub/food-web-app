import { orderModel } from "../../models/food-order.model";

export const getOrderById = async (req, res) => {
  const { id } = req.params;
  try {
    const order = await orderModel.findById(id);

    return res.status(200).json({ order });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};
