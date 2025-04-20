import { Request, Response } from "express";
import roleService from "../services/role-service/role.service";

export const getAll = async (req: Request, res: Response) => {
  const users = await roleService.getAll();
  res.status(users.statusCode).json(users);
};

export const get = async (req: Request, res: Response) => {
  const user = await roleService.get(Number(req.params.id));
  res.status(user.statusCode).json(user);
};

export const create = async (req: Request, res: Response) => {
  const newUser = await roleService.create(req.body);
  res.status(newUser.statusCode).json(newUser);
};

export const update = async (req: Request, res: Response) => {
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
