import express from "express";
import authController from "../controllers/auth-controller";
import userValidator from "../services/auth-service/auth.validator";

const router = express.Router();

router.post("/login", userValidator.validateLoginDto, authController.login);

router.post(
  "/register",
  userValidator.validateRegisterDto,
  authController.register
);

export default router;
