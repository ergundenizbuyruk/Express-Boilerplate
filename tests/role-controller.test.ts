import { describe, it, expect } from "@jest/globals";
import request from "supertest";
import app from "../src/app";
import jwt from "jsonwebtoken";
import { UserSession } from "../src/models/user-session.dto";
import { Permission } from "../src/types/permission";
import { randomUUID } from "crypto";
const secretKey = process.env.JWT_SECRET_KEY || "my-secret-key";

describe("GET /", () => {
  it("should return Hello, world!", async () => {
    const res = await request(app).get("/");
    expect(res.statusCode).toBe(200);
    expect(res.text).toBe("Hello, world!");
  });
});

describe("GET /api/roles", () => {
  it("should deny access without token", async () => {
    const res = await request(app).get("/api/roles");
    expect(res.statusCode).toBe(401);
  });

  it("should deny access with invalid token", async () => {
    const res = await request(app)
      .get("/api/roles")
      .set("Authorization", "Bearer invalidtoken");
    expect(res.statusCode).toBe(401);
  });

  it("should deny access without required permission", async () => {
    const payload: UserSession = {
      id: randomUUID(),
      email: "",
      permissions: [Permission.ROLE_CREATE],
      roles: ["admin"],
    };

    const token = jwt.sign(payload, secretKey, { expiresIn: "1h" });
    const res = await request(app)
      .get("/api/roles")
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toBe(403);
  });

  it("should access access with required permission", async () => {
    const payload: UserSession = {
      id: randomUUID(),
      email: "",
      permissions: [Permission.ROLE_GETALL],
      roles: ["admin"],
    };

    const token = jwt.sign(payload, secretKey, { expiresIn: "1h" });
    const res = await request(app)
      .get("/api/roles")
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body.data)).toBe(true);
  });
});
