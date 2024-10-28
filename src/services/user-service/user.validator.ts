import { body, param } from "express-validator";

export const validateUserCreate = [
  body("name").isString().notEmpty().withMessage("Name must be a string"),
  body("surname").isString().notEmpty().withMessage("Surname must be a string"),
  body("email").isEmail().withMessage("Email must be valid"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),
];

export const validateUserUpdate = [
  param("id").isInt().notEmpty().withMessage("ID must be an integer"),
  body("name").isString().notEmpty().withMessage("Name must be a string"),
  body("surname").isString().notEmpty().withMessage("Surname must be a string"),
  body("email").isEmail().withMessage("Email must be valid"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),
];

export default {
  validateUserCreate,
  validateUserUpdate,
};
