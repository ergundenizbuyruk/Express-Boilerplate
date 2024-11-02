import { Request, Response } from "express";
import authService from "../services/auth-service/auth.service";
import { validationResult } from "express-validator";
import { errorResponse } from "../models/response.dto";

export const login = async (req: Request, res: Response) => {
  const result = validationResult(req);
  if (!result.isEmpty()) {
    res.status(400).json(
      errorResponse(
        result.array().map((error) => error.msg),
        400
      )
    );
    return;
  }
  const loginRes = await authService.login(req.body);
  res.status(loginRes.statusCode).json(loginRes);
};

export const register = async (req: Request, res: Response) => {
  const result = validationResult(req);
  if (!result.isEmpty()) {
    res.status(400).json(
      errorResponse(
        result.array().map((error) => error.msg),
        400
      )
    );
    return;
  }

  const userDto = await authService.register(req.body);
  res.status(userDto.statusCode).json(userDto);
};

export default {
  login,
  register,
};
