import { userModel } from "../../models/user.model";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const signup = async (req, res) => {
  const { name, email, password, phoneNumber, address } = req.body;

  try {
    const existingUser = await userModel.findOne({ email });

    if (existingUser) {
      res.status(400).json({ message: "User already exists" });
      return;
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await userModel.create({
      ...req.body,
      password: hashedPassword,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    const { password: userPassword, ...userWithoutPassword } =
      newUser.toObject();

    if (!process.env.JWT_SECRET) {
      console.error("JWT_SECRET environment variable is not set");
      return res
        .status(500)
        .json({ message: "Server configuration error - JWT_SECRET not set" });
    }

    const token = jwt.sign(
      {
        userId: newUser._id,
        isAdmin: newUser.role === "admin",
      },
      process.env.JWT_SECRET
    );
    return res.status(201).json({ user: userWithoutPassword, token });
  } catch (error) {
    return res.status(500).json({ message: "Server Error", error });
  }
};
