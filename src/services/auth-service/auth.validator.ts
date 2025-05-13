import Joi from "joi";

export const registerSchema = Joi.object({
  firstname: Joi.string().required().empty().messages({
    "any.required": "firstname_is_required",
    "string.empty": "firstname_is_required",
  }),
  surname: Joi.string().required().empty().messages({
    "string.empty": "surname_is_required",
    "any.required": "surname_is_required",
  }),
  email: Joi.string().email().required().messages({
    "any.required": "email_is_required",
    "string.email": "email_is_invalid",
  }),
  password: Joi.string().min(6).required().messages({
    "any.required": "password_is_required",
    "string.min": "password_is_min_6_characters",
  }),
});

export const loginSchema = Joi.object({
  email: Joi.string().email().required().messages({
    "any.required": "email_is_required",
    "string.email": "email_is_invalid",
  }),
  password: Joi.string().required().empty().messages({
    "any.required": "password_is_required",
    "string.empty": "password_is_required",
  }),
});

export const loginWithRefreshTokenSchema = Joi.object({
  refreshToken: Joi.string().required().empty().messages({
    "string.empty": "refresh_token_is_required",
    "any.required": "refresh_token_is_required",
  }),
});

export const revokeRefreshTokenSchema = Joi.object({
  refreshToken: Joi.string().required().empty().messages({
    "string.empty": "refresh_token_is_required",
    "any.required": "refresh_token_is_required",
  }),
});
