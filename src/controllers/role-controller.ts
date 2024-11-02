import { Request, Response } from "express";
import roleService from "../services/role-service/role.service";
import { validationResult } from "express-validator";
import { errorResponse } from "../models/response.dto";

export const getAll = async (req: Request, res: Response) => {
  const users = await roleService.getAll();
  res.status(users.statusCode).json(users);
};

export const get = async (req: Request, res: Response) => {
  const user = await roleService.get(Number(req.params.id));
  res.status(user.statusCode).json(user);
};

export const create = async (req: Request, res: Response) => {
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
  const newUser = await roleService.create(req.body);
  res.status(newUser.statusCode).json(newUser);
};

export const update = async (req: Request, res: Response) => {
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

  const updatedUser = await roleService.update(Number(req.params.id), req.body);
  res.status(updatedUser.statusCode).json(updatedUser);
};

export const remove = async (req: Request, res: Response) => {
  const result = await roleService.remove(Number(req.params.id));
  res.status(result.statusCode).json(result);
};

export default {
  getAll,
  get,
  create,
  update,
  remove,
};
