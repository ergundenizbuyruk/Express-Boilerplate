import express, { Request, Response } from "express";
import swaggerUi from "swagger-ui-express";
import swaggerDocument from "./swagger/swagger-output.json";
import { PrismaClient } from "@prisma/client";
import roleRouter from "./routes/role-router";
import authRouter from "./routes/auth-router";
import { userSession } from "./middlewares/user-session";
import { errorHandler } from "./middlewares/error-handler";
import { HttpError } from "./utils/http-error";
import { successResponse } from "./models/response.dto";
import cors, { CorsOptions } from "cors";

const allowedOrigins = ["http://localhost:3000"];

const corsOptions: CorsOptions = {
  origin: function (
    origin: string | undefined,
    callback: (err: Error | null, allow?: boolean) => void
  ) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("CORS policy violation"));
    }
  },
  credentials: true,
};

const app = express();
export const prisma = new PrismaClient();

app.use(express.json());

app.use(cors(corsOptions));

app.use(userSession);

app.get("/", (req: Request, res: Response) => {
  res.status(200).json(successResponse("Hello, world!", 200));
});

app.use("/api/auth", authRouter);
app.use("/api/roles", roleRouter);
app.use("/swagger", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use((req: Request, res: Response, next: Function) => {
  const err = new HttpError("Not Found", 404);
  next(err);
});

app.use(errorHandler);

export default app;
