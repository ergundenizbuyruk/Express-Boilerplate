import { Request, Response, NextFunction } from "express";
import { errorResponse } from "../models/response.dto";
import logger from "../logger";

export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  const t = req.t;

  const status = err.status || 500;
  const message = err.message || t("internal_server_error");

  const errResponse = errorResponse([message], status);

  logger.error(`${err.message} - ${req.method} ${req.url}`, {
    meta: {
      stack: err.stack,
      path: req.path,
      method: req.method,
      userId: req.user ? req.user.id : null,
      body: req.body
    }
  });

  res.status(status).json(errResponse);
};
