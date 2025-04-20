import { Request, Response } from "express";
import authService from "../services/auth-service/auth.service";

export const login = async (req: Request, res: Response) => {
  const loginRes = await authService.login(req.body);
  res.status(loginRes.statusCode).json(loginRes);
};

export const register = async (req: Request, res: Response) => {
  const userDto = await authService.register(req.body);
  res.status(userDto.statusCode).json(userDto);
};

export default {
  login,
  register,
};
