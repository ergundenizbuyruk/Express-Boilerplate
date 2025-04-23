import { describe, it, expect } from "@jest/globals";
import { Permission } from "../src/types/permission";
import roleService from "../src/services/role-service/role.service";
import {
  RoleCreateDto,
  RoleUpdateDto,
} from "../src/services/role-service/role.dto";

describe("GET All Roles", () => {
  it("should return all roles", async () => {
    const res = await roleService.getAll();
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.data)).toBe(true);
  });
});

describe("POST Create Role", () => {
  let roleId: string = "";
  const newRoleName = "Test Role";
  const newRolePermission = Permission.ROLE_CREATE;

  const updatedRoleName = "Updated Test Role";
  const updatedRolePermission = Permission.ROLE_UPDATE;

  it("should create a new role", async () => {
    const newRole: RoleCreateDto = {
      name: newRoleName,
      permissions: [newRolePermission],
    };
    const resCreate = await roleService.create(newRole);
    expect(resCreate.statusCode).toBe(201);
    expect(resCreate.data).toHaveProperty("id", resCreate.data?.id);
    expect(resCreate.data?.name).toBe(newRole.name);
    expect(resCreate.data?.permissions).toHaveLength(1);
    expect(resCreate.data?.permissions[0].id).toBe(newRolePermission);

    roleId = resCreate.data!.id;
    expect(roleId).toBeDefined();
  });

  it("shold get role by id", async () => {
    const resGet = await roleService.get(roleId);
    expect(resGet.statusCode).toBe(200);
    expect(resGet.data).toHaveProperty("id", roleId);
    expect(resGet.data?.id).toBe(roleId);
    expect(resGet.data?.name).toBe(newRoleName);
    expect(resGet.data?.permissions).toHaveLength(1);
    expect(resGet.data?.permissions[0].id).toBe(newRolePermission);
  });

  it("should update role", async () => {
    const updatedRole: RoleUpdateDto = {
      name: updatedRoleName,
      permissions: [updatedRolePermission],
    };
    const updateRes = await roleService.update(roleId, updatedRole);
    expect(updateRes.statusCode).toBe(200);
    expect(updateRes.data?.id).toBe(roleId);
    expect(updateRes.data?.name).toBe(updatedRoleName);
    expect(updateRes.data?.permissions).toHaveLength(1);
    expect(updateRes.data?.permissions[0].id).toBe(updatedRolePermission);
  });

  it("should remove role", async () => {
    const deleteRes = await roleService.remove(roleId);
    expect(deleteRes.statusCode).toBe(200);
  });

  it("should return 404 when role not found", async () => {
    const res = await roleService.get(roleId);
    expect(res.statusCode).toBe(404);
  });
});
