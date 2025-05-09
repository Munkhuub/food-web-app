import { Router } from "express";

import { signup, signin, getMe } from "../controllers/auth";
import { authenticationMiddleware } from "../controllers/middlewares/authentification-middleware";

export const authRouter = Router();

authRouter.post("/signup", signup);
authRouter.post("/signin", authenticationMiddleware, signin);
authRouter.get("/me", authenticationMiddleware, getMe);
export default authRouter;
