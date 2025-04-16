import { categoryModel } from "../../models/food-category.model";

export const createCategoryController = async (req, res) => {
  const { categories } = req.body;

  const allCategories = categories.map((category) => ({
    categoryName: category.categoryName,
    createdAt: new Date(),
    updatedAt: new Date(),
  }));

  await categoryModel.insertMany(allCategories);
  return res.status(201).json({ message: "Category nemegdsen" });
};
