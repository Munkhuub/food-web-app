import { Router } from "express";

import { signup } from "../controllers/auth/signup";
import { signin } from "../controllers/auth/signin";

export const authRouter = Router();

authRouter.post("/signup", signup);
authRouter.post("/signin", signin);

export default authRouter;
