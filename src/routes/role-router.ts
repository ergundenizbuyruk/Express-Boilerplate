import express from "express";
import roleController from "../controllers/role-controller";
import roleValidator from "../services/role-service/role.validator";
import { authorize } from "../middlewares/authorize";
import { Permission } from "../types/permission";

const router = express.Router();

router.get("/", authorize([Permission.ROLE_READ]), roleController.getAll);
router.get("/:id", authorize([Permission.ROLE_READ]), roleController.get);
router.post(
  "/",
  authorize([Permission.ROLE_CREATE]),
  roleValidator.validateRoleCreate,
  roleController.create
);
router.put(
  "/:id",
  authorize([Permission.ROLE_UPDATE]),
  roleValidator.validateRoleUpdate,
  roleController.update
);
router.delete(
  "/:id",
  authorize([Permission.ROLE_DELETE]),
  roleController.remove
);

export default router;
