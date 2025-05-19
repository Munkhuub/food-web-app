"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const count_food_1 = require("../controllers/counter/count-food");
const countRouter = (0, express_1.Router)();
countRouter.get("/", count_food_1.countFood);
exports.default = countRouter;
//# sourceMappingURL=count.route.js.map