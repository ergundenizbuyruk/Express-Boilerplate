import { body } from "express-validator";

export const validateRoleCreate = [
  body("name").isString().notEmpty().withMessage("Name must be a string"),
  body("permissions")
    .isArray()
    .notEmpty()
    .withMessage("Permissions must be an array"),
];

export const validateRoleUpdate = [
  body("name").isString().notEmpty().withMessage("Name must be a string"),
  body("permissions")
    .isArray()
    .notEmpty()
    .withMessage("Permissions must be an array"),
];

export default {
  validateRoleCreate,
  validateRoleUpdate,
};
