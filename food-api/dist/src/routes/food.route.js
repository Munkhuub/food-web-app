"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const food_1 = require("../controllers/food");
const createOnefoodController_1 = require("../controllers/food/createOnefoodController");
const foodRouter = (0, express_1.Router)();
foodRouter
    .get("/", food_1.getFood)
    .get("/:id", food_1.getFoodById)
    .put("/:id", food_1.putFoodById)
    .delete("/:id", food_1.deleteFoodById)
    .post("/", food_1.createFoodController)
    .post("/oneFood", createOnefoodController_1.createOneFoodController);
exports.default = foodRouter;
//# sourceMappingURL=food.route.js.map