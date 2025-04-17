import { Router } from "express";
import { getFood } from "../controllers/food/get-food";
import { getFoodById } from "../controllers/food/get-food-by-id";
import { putFoodById } from "../controllers/food/put-food-by-id";
import { deleteFoodById } from "../controllers/food/delete-food-by-id";
import { createFoodController } from "../controllers/food/createFoodController";
import { getOrder } from "../controllers/orders/get-order";
import { getOrderById } from "../controllers/orders/get-order-by-id";
import { createOrderController } from "../controllers/orders/createOrderController";
import { putOrderById } from "../controllers/orders/put-order-by-id";
import { deleteOrderById } from "../controllers/orders/delete-order-by-id";

const foodRouter = Router();

foodRouter
  .get("/", getOrder)
  .get("/:id", getOrderById)
  .put("/:id", putOrderById)
  .delete("/:id", deleteOrderById)
  .post("/", createOrderController);

export default foodRouter;
