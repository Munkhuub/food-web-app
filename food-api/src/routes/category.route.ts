import { Router } from "express";
import {
  getFoodCategory,
  putFoodCategoryById,
  deleteFoodCategoryById,
  createCategoryController,
} from "../controllers/category";

const categoryRouter = Router();

categoryRouter

  .get("/", getFoodCategory)
  .patch("/:id", putFoodCategoryById)
  .delete("/:id", deleteFoodCategoryById)
  .post("/", createCategoryController);

export default categoryRouter;
