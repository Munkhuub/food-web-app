import { userModel } from "../../models/user.model";

export const createUserController = async (req, res) => {
  const {
    email,
    password,
    phoneNumber,
    address,
    role,
    orderedFoods,
    ttl,
    isVerified,
  } = req.body;

  try {
    const user = {
      email,
      password,
      phoneNumber,
      address,
      role,
      orderedFoods,
      ttl,
      isVerified,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    await userModel.create(user);
    return res.status(201).json({ message: "User added" });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};
