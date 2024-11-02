import { body } from "express-validator";

export const validateRegisterDto = [
  body("firstname")
    .isString()
    .notEmpty()
    .withMessage("Firstname must be a string"),
  body("surname").isString().notEmpty().withMessage("Surname must be a string"),
  body("email").isEmail().withMessage("Email must be valid"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),
];

export const validateLoginDto = [
  body("email").isEmail().withMessage("Email must be valid"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),
];

export default {
  validateRegisterDto,
  validateLoginDto,
};
