import { Request, Response, NextFunction } from "express";
import { errorResponse } from "../models/response.dto";
import { UserSession } from "../models/user-session";
import { Permission } from "../types/permission";

export const authorize = (requiredPermissions: Permission[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const user = req.user as UserSession;

    if (!user) {
      const response = errorResponse(["Unauthorized"], 401);
      res.status(401).json(response);
      return;
    }

    if (requiredPermissions.length === 0) {
      next();
      return;
    }

    const hasPermission = requiredPermissions.every((permission) =>
      user.permissions.includes(permission)
    );

    if (!hasPermission) {
      const response = errorResponse(["Forbidden"], 403);
      res.status(403).json(response);
      return;
    }

    next();
  };
};
