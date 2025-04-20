import { Request, Response, NextFunction } from "express";
import { ObjectSchema } from "joi";

export const validate =
  (schema: ObjectSchema, property: "body" | "query" | "params" = "body") =>
  (req: Request, res: Response, next: NextFunction) => {
    const { error } = schema.validate(req[property], { abortEarly: false });

    if (error) {
      res.status(400).json({
        status: "validation_error",
        errors: error.details.map((detail) => ({
          message: detail.message,
          path: detail.path.join("."),
        })),
      });

      return;
    }

    next();
  };
