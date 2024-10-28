import { Request, Response } from "express";
import userService from "../services/user-service/user.service";
import { validationResult } from "express-validator";
import { errorResponse } from "../models/response.dto";

export const getAllUsers = async (req: Request, res: Response) => {
  const users = await userService.getUsers();
  res.status(users.statusCode).json(users);
};

export const getUserById = async (req: Request, res: Response) => {
  const user = await userService.getUser(Number(req.params.id));
  res.status(user.statusCode).json(user);
};

export const createUser = async (req: Request, res: Response) => {
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
  const newUser = await userService.createUser(req.body);
  res.status(newUser.statusCode).json(newUser);
};

export const updateUser = async (req: Request, res: Response) => {
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

  const updatedUser = await userService.updateUser(
    Number(req.params.id),
    req.body
  );
  res.status(updatedUser.statusCode).json(updatedUser);
};

export const deleteUser = async (req: Request, res: Response) => {
  const result = await userService.deleteUser(Number(req.params.id));
  res.status(result.statusCode).json(result);
};

export default {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};
