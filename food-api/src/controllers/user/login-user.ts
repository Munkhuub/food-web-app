import { RequestHandler } from "express";
import { userModel } from "../../models/user.model";

export const loginUser = async (req, res) => {
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
    const login = {
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
    await userModel.create(login);
    return res.status(201).json({ message: "login request sent" });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};
