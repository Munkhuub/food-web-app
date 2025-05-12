import { orderModel } from "../../models/food-order.model";

export const createOrderController = async (req, res) => {
  const { user, foodOrderItems, status, totalPrice } = req.body;
  try {
    const order = await orderModel.create({
      user,
      totalPrice,
      foodOrderItems,
      status,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    return res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ message: "Server erro", error });
  }
};
