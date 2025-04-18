import { Router } from "express";

import {
  createUserController,
  deleteUserById,
  getUser,
  getUserById,
  putUserById,
  loginUser,
} from "../controllers/user";

const foodRouter = Router();

foodRouter
  .get("/", getUser)
  .get("/:id", getUserById)
  .put("/:id", putUserById)
  .delete("/:id", deleteUserById)
  .post("/", createUserController)
  .post("/", loginUser);

export default foodRouter;
