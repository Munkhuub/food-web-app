import { RequestHandler } from "express";

export const authorizationMiddleware: any = (req, res, next) => {
  const isAdmin = req.isAdmin;

  if (!isAdmin) {
    res.status(401).json({ message: "Unauthorized" });
  }
  next();
};
