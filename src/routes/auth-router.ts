import express from "express";
import authController from "../controllers/auth-controller";
import {
  loginSchema,
  loginWithRefreshTokenSchema,
  registerSchema,
  revokeRefreshTokenSchema
} from "../services/auth-service/auth.validator";
import { validate } from "../middlewares/validate";

const router = express.Router();

router.post("/login", validate(loginSchema), authController.login);

router.post("/refresh", validate(loginWithRefreshTokenSchema), authController.loginWithRefreshToken);

router.post("/revoke", validate(revokeRefreshTokenSchema), authController.revokeRefreshToken);

router.post("/register", validate(registerSchema), authController.register);

export default router;
