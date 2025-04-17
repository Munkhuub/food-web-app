import { orderModel } from "../../models/food-order.model";

export const createOrderController = async (req, res) => {
  const { user, totalPrice, foodOrderItems, status } = req.body;

  const order = {
    user,
    totalPrice,
    foodOrderItems,
    status,
    createdAt: new Date(),
    updatedAt: new Date(),
  };
  await orderModel.create(order);
  return res.status(201).json({ message: "Hool shit nemegdsen" });
};
