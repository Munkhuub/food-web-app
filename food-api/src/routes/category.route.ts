import { Router } from "express";
import { getFoodCategory } from "../controllers/category/get-food-category";
import { patchFoodCategoryById } from "../controllers/category/patch-food-category-by-id";
import { deleteFoodCategoryById } from "../controllers/category/delete-food-category-by-id";
import { postFoodCategory } from "../controllers/category/post-food-category";

const categoryRouter = Router();

categoryRouter

  .get("/", getFoodCategory)
  .patch("/", patchFoodCategoryById)
  .delete("/", deleteFoodCategoryById)
  .post("/", postFoodCategory);

export default categoryRouter;
