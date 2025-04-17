import { Router } from "express";
import { getFood } from "../controllers/food/get-food";
import { getFoodById } from "../controllers/food/get-food-by-id";
import { putFoodById } from "../controllers/food/put-food-by-id";
import { deleteFoodById } from "../controllers/food/delete-food-by-id";
import { createFoodController } from "../controllers/food/createFoodController";

const foodRouter = Router();

foodRouter
  .get("/", getFood)
  .get("/:id", getFoodById)
  .put("/:id", putFoodById)
  .delete("/:id", deleteFoodById)
  .post("/", createFoodController);

export default foodRouter;
