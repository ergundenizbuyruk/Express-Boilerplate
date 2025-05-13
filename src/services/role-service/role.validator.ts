import Joi from "joi";

export const roleCreateSchema = Joi.object({
  name: Joi.string().required(),
  permissions: Joi.array().items(Joi.number()).required().min(1).messages({
    "array.min": "at_least_one_permission_is_required",
    "array.base": "permission_must_be_an_array",
    "number.base": "each_permission_must_be_a_number",
    "any.required": "permissions_required",
  }),
});

export const roleUpdateSchema = Joi.object({
  name: Joi.string().required(),
  permissions: Joi.array().items(Joi.number()).required().min(1).messages({
    "array.min": "at_least_one_permission_is_required",
    "array.base": "permission_must_be_an_array",
    "number.base": "each_permission_must_be_a_number",
    "any.required": "permissions_required",
  }),
});
