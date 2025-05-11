import { Router } from "express";

import {
  getOrder,
  getOrderById,
  createOrderController,
  putOrderById,
  deleteOrderById,
} from "../controllers/orders";
import { getUserOrdersController } from "../controllers/orders/get-user-orders";
import { authenticationMiddleware } from "../controllers/middlewares/authentication-middleware";
import { authorizationMiddleware } from "../controllers/middlewares/authorization-middleware";

const orderRouter = Router();

orderRouter
  .post("/", authenticationMiddleware, createOrderController)
  .get("/", authenticationMiddleware, authorizationMiddleware, getOrder)
  .get("/users/:userId/orders", getUserOrdersController)
  .get("/:id", authenticationMiddleware, getOrderById)

  .put("/:id", authenticationMiddleware, putOrderById)
  .delete("/:id", authenticationMiddleware, deleteOrderById);

export default orderRouter;
