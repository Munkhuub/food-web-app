"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const orders_1 = require("../controllers/orders");
const authentication_middleware_1 = require("../middlewares/authentication-middleware");
const get_all_order_1 = require("../controllers/orders/get-all-order");
const orderRouter = (0, express_1.Router)();
orderRouter
    .post("/", authentication_middleware_1.authenticationMiddleware, orders_1.createOrderController)
    .get("/", authentication_middleware_1.authenticationMiddleware, orders_1.getOrder)
    .get("/all", get_all_order_1.getAllOrder)
    .get("/:id", authentication_middleware_1.authenticationMiddleware, orders_1.getOrderById)
    .put("/:id", authentication_middleware_1.authenticationMiddleware, orders_1.putOrderById)
    .delete("/:id", authentication_middleware_1.authenticationMiddleware, orders_1.deleteOrderById);
exports.default = orderRouter;
//# sourceMappingURL=order.route.js.map