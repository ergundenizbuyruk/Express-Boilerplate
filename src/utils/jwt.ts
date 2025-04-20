import jwt, { SignOptions } from "jsonwebtoken";
import { UserSession } from "../models/user-session.dto";

const secretKey = process.env.JWT_SECRET_KEY || "my-secret-key";
export const jwtExpiresIn: number = process.env.JWT_EXPIRES_MINUTE_TIME
  ? Number.parseInt(process.env.JWT_EXPIRES_MINUTE_TIME)
  : 60 * 60_000; // 1 hour
export const refreshTokenexpiresIn = process.env
  .REFRESH_TOKEN_EXPIRES_MINUTE_TIME
  ? Number.parseInt(process.env.REFRESH_TOKEN_EXPIRES_MINUTE_TIME)
  : 24 * 60 * 60_000; // 1 day

export function signToken(userSession: UserSession): string {
  const options: SignOptions = { expiresIn: jwtExpiresIn };
  return jwt.sign(userSession, secretKey, options);
}

export function verifyToken(token: string): UserSession | null {
  try {
    return jwt.verify(token, secretKey) as UserSession;
  } catch (error) {
    console.error("Invalid token:", error);
    return null;
  }
}
