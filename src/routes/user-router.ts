import express from "express";
import userController from "../controllers/user-controller";
import userValidator from "../services/user-service/user.validator";
import { body } from "express-validator";

const router = express.Router();

router.get("/", userController.getAllUsers);
router.get("/:id", userController.getUserById);
router.post("/", userValidator.validateUserCreate, userController.createUser);
router.put("/:id", userValidator.validateUserUpdate, userController.updateUser);
router.delete("/:id", userController.deleteUser);

export default router;
