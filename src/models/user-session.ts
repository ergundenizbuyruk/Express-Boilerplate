import { Permission } from "../types/permission";

export interface UserSession {
  id: number;
  email: string;
  permissions: Permission[];
  roles: string[];
}
