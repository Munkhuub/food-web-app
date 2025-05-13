import { userModel } from "../../models/user.model";

export const putUserById = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await userModel.findByIdAndUpdate(
      id,
      {
        ...req.body,
      },
      { new: true }
    );
    return res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};
