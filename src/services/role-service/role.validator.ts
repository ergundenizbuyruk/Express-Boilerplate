import { body } from "express-validator";

const validateRoleCreate = [
  body("name").isString().notEmpty().withMessage("Name must be a string"),
  body("permissions")
    .isArray()
    .notEmpty()
    .withMessage("Permissions must be an array"),
];

const validateRoleUpdate = [
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
