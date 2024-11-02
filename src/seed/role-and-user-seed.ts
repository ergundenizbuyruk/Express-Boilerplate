import { prisma } from "../index";

const seedAdminUserAndRole = async () => {
  const adminRoleName = "Admin";
  const adminUserName = "Admin";
  const adminEmail = "admin@admin.com";
  const adminPassword = "adminPass123";
  const adminUserId = 1;
  const adminRoleId = 1;

  const allPermissions = await prisma.permission.findMany();

  const adminRoleFromDb = await prisma.role.findUnique({
    where: { id: adminRoleId },
    include: { permissions: true },
  });

  if (!adminRoleFromDb) {
    const adminRole = await prisma.role.create({
      data: {
        id: adminRoleId,
        name: adminRoleName,
        permissions: { connect: allPermissions },
      },
    });

    console.log("Admin role created", adminRole);
  } else {
    const adminRole = await prisma.role.update({
      where: { id: adminRoleId },
      data: { permissions: { connect: allPermissions } },
    });

    console.log("Admin role updated.", adminRole);
  }

  const adminUserFromDb = await prisma.user.findUnique({
    where: { id: adminUserId },
    include: { roles: true },
  });

  if (!adminUserFromDb) {
    const adminUser = await prisma.user.create({
      data: {
        id: adminUserId,
        firstname: adminUserName,
        surname: adminUserName,
        email: adminEmail,
        password: adminPassword,
        roles: { connect: { id: adminRoleId } },
      },
    });

    console.log("Admin user created", adminUser);
  } else {
    console.log("Admin user already exists.", adminUserFromDb);
  }
};

export default seedAdminUserAndRole;
