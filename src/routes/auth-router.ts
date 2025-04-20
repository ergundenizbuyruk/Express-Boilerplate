import express from "express";
import authController from "../controllers/auth-controller";
import {
  loginSchema,
  registerSchema,
} from "../services/auth-service/auth.validator";
import { validate } from "../middlewares/validate";

const router = express.Router();

router.post("/login", validate(loginSchema), authController.login);

router.post("/register", validate(registerSchema), authController.register);

export default router;
