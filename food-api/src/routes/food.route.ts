import { Router } from "express";
import { getFood } from "../controllers/food/get-food";
import { getFoodById } from "../controllers/food/get-food-by-id";
import { patchFoodById } from "../controllers/food/patch-food-by-id";
import { deleteFoodById } from "../controllers/food/delete-food-by-id";
import { createFoodController } from "../controllers/food/createFoodController";

const foodRouter = Router();

foodRouter
  .get("/", getFood)
  .get("/Id", getFoodById)
  .patch("/", patchFoodById)
  .delete("/", deleteFoodById)
  .post("/", createFoodController);

export default foodRouter;
