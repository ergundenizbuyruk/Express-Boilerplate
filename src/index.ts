import express, { Request, Response } from "express";
import swaggerUi from "swagger-ui-express";
import swaggerDocument from "./swagger/swagger-output.json";
import { PrismaClient } from "@prisma/client";
import userRouter from "./routes/user-router";

const app = express();
const port = process.env.PORT || 3000;

export const prisma = new PrismaClient();
app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.send("Hello, worlddddddd!");
});

app.use("/api/users", userRouter);

app.use("/swagger", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
