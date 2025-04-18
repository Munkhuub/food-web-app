import { orderModel } from "../../models/food-order.model";

export const putOrderById = async (req, res) => {
  const { user, totalPrice, foodOrderItems, status } = req.body;

  const { id } = req.params;

  try {
    const order = await orderModel.findByIdAndUpdate(id, {
      user,
      totalPrice,
      foodOrderItems,
      status,
    });
    return res.status(200).json({ order });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};
