import { UserSession } from "../models/user-session.dto";

declare global {
  namespace Express {
    interface Request {
      user?: UserSession;
    }
  }
}
