import { Request, Response, NextFunction } from "express";
import { errorResponse } from "../models/response.dto";
import { ZodSchema } from "zod";

export const validate =
  (schema: ZodSchema<any>, property: "body" | "query" | "params" = "body") =>
  (req: Request, res: Response, next: NextFunction) => {
    const t = req.t;

    const result = schema.safeParse(req[property]);

    if (!result.success) {
      const notValidResponse = errorResponse(
        result.error.errors.map((error) => t(error.message)),
        400
      );

      res.status(400).json(notValidResponse);
      return;
    }

    next();
  };
