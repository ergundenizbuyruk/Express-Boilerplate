import express, { Request, Response } from "express";
import swaggerUi from "swagger-ui-express";
import swaggerDocument from "./swagger/swagger-output.json";
import { PrismaClient } from "@prisma/client";
import roleRouter from "./routes/role-router";
import authRouter from "./routes/auth-router";
import { userSession } from "./middlewares/user-session";

const app = express();
export const prisma = new PrismaClient();

app.use(express.json());
app.use(userSession);

app.get("/", (req: Request, res: Response) => {
  res.send("Hello, world!");
});

app.use("/api/auth", authRouter);
app.use("/api/roles", roleRouter);
app.use("/swagger", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

export default app;
