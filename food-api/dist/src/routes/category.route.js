"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const category_1 = require("../controllers/category");
const categoryRouter = (0, express_1.Router)();
categoryRouter
    .get("/", category_1.getFoodCategory)
    .patch("/:id", category_1.putFoodCategoryById)
    .delete("/:id", category_1.deleteFoodCategoryById)
    .post("/", category_1.createCategoryController);
exports.default = categoryRouter;
//# sourceMappingURL=category.route.js.map