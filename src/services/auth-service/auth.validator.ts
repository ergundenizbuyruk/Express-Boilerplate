import { z } from "zod";

export const registerSchema = z.object({
  firstname: z
    .string({
      required_error: "firstname_is_required",
      invalid_type_error: "firstname_is_required",
    })
    .min(1, { message: "firstname_is_required" }),
  surname: z
    .string({
      required_error: "surname_is_required",
      invalid_type_error: "surname_is_required",
    })
    .min(1, { message: "surname_is_required" }),
  email: z
    .string({
      required_error: "email_is_required",
      invalid_type_error: "email_is_invalid",
    })
    .email({ message: "email_is_invalid" })
    .nonempty({ message: "email_is_required" }),
  password: z
    .string({
      required_error: "password_is_required",
      invalid_type_error: "password_is_required",
    })
    .min(6, { message: "password_is_min_6_characters" })
    .nonempty({ message: "password_is_required" }),
});

export const loginSchema = z.object({
  email: z
    .string({
      required_error: "email_is_required",
      invalid_type_error: "email_is_invalid",
    })
    .email({ message: "email_is_invalid" })
    .nonempty({ message: "email_is_required" }),
  password: z
    .string({
      required_error: "password_is_required",
      invalid_type_error: "password_is_required",
    })
    .min(1, { message: "password_is_required" }),
});

export const loginWithRefreshTokenSchema = z.object({
  refreshToken: z
    .string({
      required_error: "refresh_token_is_required",
      invalid_type_error: "refresh_token_is_required",
    })
    .min(1, { message: "refresh_token_is_required" }),
});

export const revokeRefreshTokenSchema = z.object({
  refreshToken: z
    .string({
      required_error: "refresh_token_is_required",
      invalid_type_error: "refresh_token_is_required",
    })
    .min(1, { message: "refresh_token_is_required" }),
});
