import { Permission } from "../../types/permission";

export interface RoleDto {
  id: string;
  name: string;
  permissions: PermissionDto[];
}

export interface RoleCreateDto {
  name: string;
  permissions: Permission[];
}

export interface RoleUpdateDto {
  name: string;
  permissions: Permission[];
}

export interface PermissionDto {
  id: number;
  name: string;
}
