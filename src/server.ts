import app from "./app";
import { syncPermissions } from "./seed/sync-permission";
import seedAdminUserAndRole from "./seed/role-and-user-seed";

const port = process.env.PORT || 3000;
const seedData = process.env.SEED_DATA === "true";

async function main() {
  if (seedData) {
    await syncPermissions();
    await seedAdminUserAndRole();
  }

  app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });
}

main().catch((error) => {
  console.error(error);
});
