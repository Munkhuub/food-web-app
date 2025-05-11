import { Router } from "express";

import { signup, signin, me } from "../controllers/auth";
import { authenticationMiddleware } from "../controllers/middlewares/authentication-middleware";

export const authRouter = Router();

authRouter.post("/signup", signup);
authRouter.post("/signin", signin);
authRouter.get("/me", authenticationMiddleware, me);
export default authRouter;
