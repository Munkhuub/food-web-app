import { foodModel } from "../../models/food.model";

export const putFoodById = async (req, res) => {
  const { foodName, price, image, ingredients, category } = req.body;
  const { id } = req.params;

  try {
    // Find the food item by ID and update it
    const updatedFood = await foodModel.findByIdAndUpdate(
      id,
      { foodName, price, image, ingredients, category },
      { new: true } // `new: true` ensures you get the updated document
    );

    // If food item not found
    if (!updatedFood) {
      return res.status(404).json({ message: "Food item not found" });
    }

    return res.status(200).json({ food: updatedFood }); // Return the updated food item
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server Error", error });
  }
};
