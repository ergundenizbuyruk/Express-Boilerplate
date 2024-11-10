import { Permission } from "../types/permission";
import { prisma } from "../index";

export async function syncPermissions() {
  const enumPermissions = Object.entries(Permission)
    .filter(([key]) => isNaN(Number(key)))
    .map(([name, id]) => ({ id: id as number, name }));

  const dbPermissions = await prisma.permission.findMany();
  const dbPermissionIds = new Set(
    dbPermissions.map((permission) => permission.id)
  );

  const missingPermissions = enumPermissions.filter(
    (permission) => !dbPermissionIds.has(permission.id)
  );

  await prisma.permission.createMany({
    data: missingPermissions,
  });

  console.log("Permissions synced with the database.");
}
