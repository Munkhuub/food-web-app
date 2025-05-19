"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const food_route_1 = __importDefault(require("../src/routes/food.route"));
const connect_to_db_1 = require("../src/database/connect-to-db");
const category_route_1 = __importDefault(require("../src/routes/category.route"));
const cors_1 = __importDefault(require("cors"));
const count_route_1 = __importDefault(require("../src/routes/count.route"));
const countAll_route_1 = __importDefault(require("../src/routes/countAll.route"));
const auth_route_1 = __importDefault(require("../src/routes/auth.route"));
const dotenv_1 = require("dotenv");
const order_route_1 = __importDefault(require("../src/routes/order.route"));
const user_route_1 = __importDefault(require("../src/routes/user.route"));
(0, dotenv_1.config)();
const port = 3001;
(0, connect_to_db_1.connectToDatabase)();
const app = (0, express_1.default)();
app
    .use((0, cors_1.default)())
    .use(express_1.default.json())
    .use("/food", food_route_1.default)
    .use("/category", category_route_1.default)
    .use("/count", count_route_1.default)
    .use("/countAll", countAll_route_1.default)
    .use("/auth", auth_route_1.default)
    .use("/orders", order_route_1.default)
    .use("/user", user_route_1.default);
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
//# sourceMappingURL=index.js.map