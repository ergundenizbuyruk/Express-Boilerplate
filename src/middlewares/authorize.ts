import { Request, Response, NextFunction } from "express";
import { errorResponse } from "../models/response.dto";
import { UserSession } from "../models/user-session.dto";
import { Permission } from "../types/permission";

export const authorize = (requiredPermissions: Permission[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const t = req.t;
    const user = req.user as UserSession;

    if (!user) {
      const response = errorResponse([t("unauthorized_message")], 401);
      res.status(401).json(response);
      return;
    }

    if (requiredPermissions.length === 0) {
      next();
      return;
    }

    const hasPermission = requiredPermissions.every((permission) => user.permissions.includes(permission));

    if (!hasPermission) {
      const response = errorResponse([t("forbidden_message")], 403);
      res.status(403).json(response);
      return;
    }

    next();
  };
};
