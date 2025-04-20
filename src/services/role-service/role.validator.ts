import Joi from "joi";

export const roleCreateSchema = Joi.object({
  name: Joi.string().required(),
  permissions: Joi.array().items(Joi.string()).required().min(1).messages({
    "array.min": "At least one permission is required",
    "array.base": "Permissions must be an array",
    "string.base": "Each permission must be a string",
  }),
});

export const roleUpdateSchema = Joi.object({
  name: Joi.string().required(),
  permissions: Joi.array().items(Joi.string()).required().min(1).messages({
    "array.min": "At least one permission is required",
    "array.base": "Permissions must be an array",
    "string.base": "Each permission must be a string",
  }),
});
