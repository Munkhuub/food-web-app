"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const count_all_food_1 = require("../controllers/counter/count-all-food");
const countAllRouter = (0, express_1.Router)();
countAllRouter.get("/", count_all_food_1.countAllFood);
exports.default = countAllRouter;
//# sourceMappingURL=countAll.route.js.map