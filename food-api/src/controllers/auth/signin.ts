import { userModel } from "../../models/user.model";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const signin = async (req, res) => {
  const { email, password } = req.body;
  console.log("Signin attempt:", email);

  try {
    const user = await userModel.findOne({ email });

    if (!user) {
      console.log("User not found");
      res.status(404).json({ message: "Usernama or password invalid" });
      return;
    }

    const { password: hashedPassword, ...userWithoutPassword } =
      user.toObject();

    const isPasswordMatch = await bcrypt.compare(password, hashedPassword);

    if (!isPasswordMatch) {
      console.log("Password mismatch");
      return res.status(404).json({ message: "Username or password invalid" });
    }

    const token = jwt.sign(
      {
        userId: user._id,
        isAdmin: user.role === "admin",
      },
      process.env.JWT_SECRET
    );
    return res.status(200).json({ user: userWithoutPassword, token });
  } catch (error) {
    console.error("Signup error:", error);
    return res
      .status(500)
      .json({ message: "Server Error", error: error.message });
  }
};
