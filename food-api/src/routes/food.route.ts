import { Router } from "express";
import { getFood } from "../controllers/food/get-food";
import { getFoodById } from "../controllers/food/get-food-by-id";
import { patchFoodById } from "../controllers/food/patch-food-by-id";
import { deleteFoodById } from "../controllers/food/delete-food-by-id";
import { getFoodCategory } from "../controllers/category/get-food-category";
import { patchFoodCategoryById } from "../controllers/category/patch-food-category-by-id";
import { deleteFoodCategoryById } from "../controllers/category/delete-food-category-by-id";

const foodRouter = Router();

foodRouter
  .get("/", getFood)
  .get("/Id", getFoodById)
  .patch("/", patchFoodById)
  .delete("/", deleteFoodById)
  .post("/", (req, res) => {});

export default foodRouter;
