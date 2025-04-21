import { Permission } from "../types/permission";

export interface UserSession {
  id: string;
  email: string;
  permissions: Permission[];
  roles: string[];
}
