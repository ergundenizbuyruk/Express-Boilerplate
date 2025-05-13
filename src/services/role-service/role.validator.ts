import { z } from "zod";

const permissionsSchema = z
  .array(z.number({ invalid_type_error: "each_permission_must_be_a_number" }), {
    invalid_type_error: "permission_must_be_an_array",
    required_error: "permissions_required",
  })
  .min(1, { message: "at_least_one_permission_is_required" });

export const roleCreateSchema = z.object({
  name: z.string({
    required_error: "name_is_required",
    invalid_type_error: "name_is_required",
  }),
  permissions: permissionsSchema,
});

export const roleUpdateSchema = z.object({
  name: z.string({
    required_error: "refresh_token_is_required",
    invalid_type_error: "refresh_token_is_required",
  }),
  permissions: permissionsSchema,
});
