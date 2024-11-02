import { UserSession } from "../models/user-session";

declare global {
  namespace Express {
    interface Request {
      user?: UserSession;
    }
  }
}
