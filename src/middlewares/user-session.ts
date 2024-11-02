import { NextFunction, Request, Response } from "express";
import { verifyToken } from "../utils/jwt";

export const userSession = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    req.user = undefined;
    return next();
  }

  const user = verifyToken(token);

  if (!user) {
    req.user = undefined;
    return next();
  }

  req.user = user;
  next();
};
