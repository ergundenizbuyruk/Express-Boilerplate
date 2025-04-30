import { createLogger, format, transports } from "winston";
import { prisma } from "../app";

const { combine, timestamp, printf } = format;

const logFormat = printf(({ timestamp, level, message }) => {
  return `[${timestamp}] ${level.toUpperCase()}: ${message}`;
});

const logger = createLogger({
  level: "info",
  format: combine(timestamp(), logFormat),
  transports: [
    new transports.File({ filename: "logs/combined.log" }),
    new transports.Console(),
  ],
});

logger.on("data", async (log) => {
  if (log.level === "error") {
    try {
      await prisma.errorLog.create({
        data: {
          level: log.level,
          message: log.message,
          meta: log.meta || {},
        },
      });
    } catch (err) {
      console.error("Error saving log to DB:", err);
    }
  }
});

export default logger;
