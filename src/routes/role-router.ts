import express from "express";
import roleController from "../controllers/role-controller";
import {
  roleCreateSchema,
  roleUpdateSchema,
} from "../services/role-service/role.validator";
import { authorize } from "../middlewares/authorize";
import { Permission } from "../types/permission";
import { validate } from "../middlewares/validate";

const router = express.Router();

router.get("/", authorize([Permission.ROLE_GETALL]), roleController.getAll);
router.get("/:id", authorize([Permission.ROLE_GET]), roleController.get);
router.post(
  "/",
  authorize([Permission.ROLE_CREATE]),
  validate(roleCreateSchema),
  roleController.create
);
router.put(
  "/:id",
  authorize([Permission.ROLE_UPDATE]),
  validate(roleUpdateSchema),
  roleController.update
);
router.delete(
  "/:id",
  authorize([Permission.ROLE_DELETE]),
  roleController.remove
);

export default router;
