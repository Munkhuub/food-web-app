import { Router } from "express";

import {
  createUserController,
  deleteUserById,
  getUser,
  getUserById,
  putUserById,
  loginUser,
} from "../controllers/user";

const userRouter = Router();

userRouter
  .get("/", getUser)
  .post("/", createUserController)
  .post("/", loginUser)
  .get("/:id", getUserById)
  .put("/:id", putUserById)
  .delete("/:id", deleteUserById);

export default userRouter;
