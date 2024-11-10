import jwt, { SignOptions } from "jsonwebtoken";
import { UserSession } from "../models/user-session.dto";

const secretKey = process.env.JWT_SECRET_KEY || "my-secret-key";

export function signToken(userSession: UserSession): string {
  const options: SignOptions = { expiresIn: "1h" };
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
