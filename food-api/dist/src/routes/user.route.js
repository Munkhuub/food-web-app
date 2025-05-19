"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_1 = require("../controllers/user");
const userRouter = (0, express_1.Router)();
userRouter
    .get("/", user_1.getUser)
    .post("/", user_1.createUserController)
    .post("/", user_1.loginUser)
    .get("/:id", user_1.getUserById)
    .put("/:id", user_1.putUserById)
    .delete("/:id", user_1.deleteUserById);
exports.default = userRouter;
//# sourceMappingURL=user.route.js.map