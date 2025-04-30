import { Router } from "express";
import {
  getFood,
  getFoodById,
  putFoodById,
  deleteFoodById,
  createFoodController,
} from "../controllers/food";
import { createOneFoodController } from "../controllers/food/createOnefoodController";

const foodRouter = Router();

foodRouter
  .get("/", getFood)
  .get("/:id", getFoodById)
  .put("/:id", putFoodById)
  .delete("/:id", deleteFoodById)
  .post("/", createFoodController)
  .post("/oneFood", createOneFoodController);

export default foodRouter;
