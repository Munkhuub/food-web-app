import { Router } from "express";

import {
  getOrder,
  getOrderById,
  createOrderController,
  putOrderById,
  deleteOrderById,
} from "../controllers/orders";
import { getUserOrdersController } from "../controllers/orders/get-user-orders";
import { authenticationMiddleware } from "../middlewares/authentication-middleware";
import { authorizationMiddleware } from "../middlewares/authorization-middleware";
import { getAllOrder } from "../controllers/orders/get-all-order";

const orderRouter = Router();

orderRouter
  .post("/", authenticationMiddleware, createOrderController)
  .get("/", authenticationMiddleware, getOrder)
  .get("/all", getAllOrder)
  .get("/:id", authenticationMiddleware, getOrderById)

  .put("/:id", authenticationMiddleware, putOrderById)
  .delete("/:id", authenticationMiddleware, deleteOrderById);

export default orderRouter;
