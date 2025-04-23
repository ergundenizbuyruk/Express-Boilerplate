import { Request, Response, NextFunction } from "express";
import { errorResponse } from "../models/response.dto";

export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error(err.stack);

  const status = err.status || 500;
  const message = err.message || "Internal Server Error";

  const errResponse = errorResponse([message], status);
  res.status(status).json(errResponse);
};
