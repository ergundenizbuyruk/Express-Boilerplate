import { prisma } from "../../index.js";
import {
  errorResponse,
  ResponseDto,
  successResponse,
} from "../../models/response.dto.js";
import { UserSession } from "../../models/user-session.js";
import { Permission } from "../../types/permission.js";
import { signToken } from "../../utils/jwt.js";
import { UserDto } from "../user-service/user.dto.js";
import { LoginDto, LoginResponseDto, RegisterDto } from "./auth.dto.js";

const login = async (
  loginDto: LoginDto
): Promise<ResponseDto<LoginResponseDto>> => {
  const user = await prisma.user.findUnique({
    where: { email: loginDto.email },
    include: {
      roles: {
        include: { permissions: true },
      },
    },
  });

  if (!user) {
    return errorResponse(["User not found"], 404);
  }

  if (user.password !== loginDto.password) {
    return errorResponse(["Invalid password"], 400);
  }

  const userSession: UserSession = {
    id: user.id,
    email: user.email,
    roles: user.roles.map((r) => r.name),
    permissions: [
      ...new Set(
        user.roles.flatMap((r) => r.permissions.map((p) => p.id as Permission))
      ),
    ],
  };

  const accessToken = signToken(userSession);
  const refreshToken = crypto.randomUUID();

  const loginResponse: LoginResponseDto = {
    accessToken,
    refreshToken,
    accessTokenExpiresDate: new Date(Date.now() + 60 * 60 * 1000),
    refreshTokenExpiresDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
  };

  return successResponse(loginResponse, 200);
};

const register = async (
  createDto: RegisterDto
): Promise<ResponseDto<UserDto>> => {
  const userFromdb = await prisma.user.create({
    data: { ...createDto },
    include: {
      roles: {
        include: { permissions: true },
      },
    },
  });
  const userDto: UserDto = { ...userFromdb };
  return successResponse(userDto, 201);
};

export default {
  login,
  register,
};
