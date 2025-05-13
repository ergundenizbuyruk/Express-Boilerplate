import { Request, Response, NextFunction } from "express";
import { ObjectSchema } from "joi";
import { errorResponse } from "../models/response.dto";

export const validate =
  (schema: ObjectSchema, property: "body" | "query" | "params" = "body") =>
  (req: Request, res: Response, next: NextFunction) => {
    const t = req.t;
    const { error } = schema.validate(req[property], { abortEarly: false });

    if (error) {
      const notValidResponse = errorResponse(
        error.details.map((detail) => t(detail.message)),
        400
      );

      res.status(400).json(notValidResponse);
      return;
    }

    next();
  };
