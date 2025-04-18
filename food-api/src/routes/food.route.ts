import { Router } from "express";
import {
  getFood,
  getFoodById,
  putFoodById,
  deleteFoodById,
  createFoodController,
} from "../controllers/food";

const foodRouter = Router();

foodRouter
  .get("/", getFood)
  .get("/:id", getFoodById)
  .put("/:id", putFoodById)
  .delete("/:id", deleteFoodById)
  .post("/", createFoodController);

export default foodRouter;
