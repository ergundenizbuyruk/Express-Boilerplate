import express, { Request, Response } from "express";
import swaggerUi from "swagger-ui-express";
import swaggerDocument from "./swagger/swagger-output.json";
import { PrismaClient } from "@prisma/client";
import roleRouter from "./routes/role-router";
import authRouter from "./routes/auth-router";
import { userSession } from "./middlewares/user-session";
import { errorHandler } from "./middlewares/error-handler";
import { HttpError } from "./utils/http-error";
import { errorResponse, successResponse } from "./models/response.dto";
import cors, { CorsOptions } from "cors";
import { rateLimit } from "express-rate-limit";
import i18nextMiddleware from "i18next-http-middleware";
import i18n from "./i18n";

const allowedOrigins = ["http://localhost:3000"];

const corsOptions: CorsOptions = {
  origin: function (origin: string | undefined, callback: (err: Error | null, allow?: boolean) => void) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("CORS policy violation"));
    }
  },
  credentials: true
};

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  limit: 100,
  standardHeaders: "draft-8",
  legacyHeaders: false,
  statusCode: 429,
  handler: (req: Request, res: Response) => {
    const t = req.t;
    res.status(429).json(errorResponse([t("too_many_requests")], 429));
  }
});

const app = express();
export const prisma = new PrismaClient();

app.use(express.json());

app.use(i18nextMiddleware.handle(i18n));

app.use(cors(corsOptions));

app.use(limiter);

app.use(userSession);

app.get("/", (req: Request, res: Response) => {
  const t = req.t;
  res.status(200).json(successResponse(t("hello_world"), 200));
});

app.use("/api/auth", authRouter);
app.use("/api/roles", roleRouter);
app.use("/swagger", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use((req: Request, res: Response, next: Function) => {
  const t = req.t;
  const err = new HttpError(t("not_found"), 404);
  next(err);
});

app.use(errorHandler);

export default app;
