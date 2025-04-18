import { Router } from "express";

import {
  getOrder,
  getOrderById,
  createOrderController,
  putOrderById,
  deleteOrderById,
} from "../controllers/orders";

const foodRouter = Router();

foodRouter
  .get("/", getOrder)
  .get("/:id", getOrderById)
  .put("/:id", putOrderById)
  .delete("/:id", deleteOrderById)
  .post("/", createOrderController);

export default foodRouter;
