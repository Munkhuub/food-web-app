"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRouter = void 0;
const express_1 = require("express");
const auth_1 = require("../controllers/auth");
const authentication_middleware_1 = require("../middlewares/authentication-middleware");
exports.authRouter = (0, express_1.Router)();
exports.authRouter.post("/signup", auth_1.signup);
exports.authRouter.post("/signin", auth_1.signin);
exports.authRouter.get("/me", authentication_middleware_1.authenticationMiddleware, auth_1.me);
exports.default = exports.authRouter;
//# sourceMappingURL=auth.route.js.map