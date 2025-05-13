import { Request, Response } from "express";
import authService from "../services/auth-service/auth.service";
import asyncHandler from "express-async-handler";

export const login = asyncHandler(async (req: Request, res: Response) => {
  const loginRes = await authService.login(req.body, req.t);
  res.status(loginRes.statusCode).json(loginRes);
});

export const loginWithRefreshToken = asyncHandler(
  async (req: Request, res: Response) => {
    const loginRes = await authService.loginWithRefreshToken(req.body, req.t);
    res.status(loginRes.statusCode).json(loginRes);
  }
);

export const revokeRefreshToken = asyncHandler(
  async (req: Request, res: Response) => {
    const revokeRes = await authService.revokeRefreshToken(req.body, req.t);
    res.status(revokeRes.statusCode).json(revokeRes);
  }
);

export const register = asyncHandler(async (req: Request, res: Response) => {
  const userDto = await authService.register(req.body, req.t);
  res.status(userDto.statusCode).json(userDto);
});

export default {
  login,
  loginWithRefreshToken,
  revokeRefreshToken,
  register,
};
