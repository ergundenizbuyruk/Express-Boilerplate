import express, { Request, Response } from "express";
import swaggerUi from "swagger-ui-express";
import swaggerDocument from "./swagger/swagger-output.json";
import { PrismaClient } from "@prisma/client";
import roleRouter from "./routes/role-router";
import authRouter from "./routes/auth-router";
import { userSession } from "./middlewares/user-session";
import { syncPermissions } from "./seed/synv-permission";

const app = express();
const port = process.env.PORT || 3000;
const isSyncPermission = process.env.SYNC_PERMISSIONS === "true";

async function main() {
  if (isSyncPermission) {
    await syncPermissions();
  }

  app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });
}

export const prisma = new PrismaClient();

app.use(express.json());

app.use(userSession);

app.get("/", (req: Request, res: Response) => {
  res.send("Hello, world!");
});

app.use("/api/auth", authRouter);
app.use("/api/roles", roleRouter);

app.use("/swagger", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

main().catch((error) => {
  console.error(error);
});
