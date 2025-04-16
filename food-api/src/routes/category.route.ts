import { Router } from "express";
import { getFoodCategory } from "../controllers/category/get-food-category";
import { putFoodCategoryById } from "../controllers/category/put-food-category-by-id";
import { deleteFoodCategoryById } from "../controllers/category/delete-food-category-by-id";
import { createCategoryController } from "../controllers/category/createCategoryController";

const categoryRouter = Router();

categoryRouter

  .get("/", getFoodCategory)
  .patch("/:id", putFoodCategoryById)
  .delete("/:id", deleteFoodCategoryById)
  .post("/", createCategoryController);

export default categoryRouter;
