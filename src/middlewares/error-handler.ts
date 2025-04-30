import { Request, Response, NextFunction } from "express";
import { errorResponse } from "../models/response.dto";
import logger from "../logger";

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

  logger.error(`${err.message} - ${req.method} ${req.url}`, {
    meta: {
      stack: err.stack,
      path: req.path,
      method: req.method,
      userId: req.user ? req.user.id : null,
      body: req.body,
    },
  });
  
  res.status(status).json(errResponse);
};
