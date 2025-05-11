import { orderModel } from "../../models/food-order.model";

export const getUserOrdersController = async (req, res) => {
  try {
    const userId = req.user.id || req.userId;

    if (!userId) {
      return res
        .status(400)
        .json({ message: "User ID not provided or invalid token." });
    }

    const orders = await orderModel
      .find({ user: userId })
      .sort({ createdAt: -1 });

    if (!orders) {
      return res
        .status(404)
        .json({ message: "No orders found for this user." });
    }

    // Return the list of orders
    return res.status(200).json(orders);
  } catch (error) {
    console.error("Error fetching user orders:", error); // Log the error for debugging
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};
