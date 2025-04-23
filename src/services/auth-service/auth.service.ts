import { prisma } from "../../app";
import {
  errorResponse,
  ResponseDto,
  successResponse,
} from "../../models/response.dto";
import { UserSession } from "../../models/user-session.dto";
import { Permission } from "../../types/permission";
import {
  jwtExpiresIn,
  refreshTokenexpiresIn,
  signToken,
} from "../../utils/jwt";
import {
  LoginDto,
  LoginResponseDto,
  LoginWithRefreshTokenDto,
  RegisterDto,
  UserDto,
} from "./auth.dto";
import bcrypt from "bcrypt";

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
    return errorResponse(["Invalid password or email"], 400);
  }

  const verifyRes = await verifyPassword(loginDto.password, user.password);

  if (!verifyRes) {
    return errorResponse(["Invalid password or email"], 400);
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
  const now = Date.now();

  await prisma.userRefreshToken.create({
    data: {
      token: refreshToken,
      userId: user.id,
      expiresAt: new Date(now + refreshTokenexpiresIn),
    },
  });

  const loginResponse: LoginResponseDto = {
    accessToken,
    refreshToken,
    accessTokenExpiresDate: new Date(now + jwtExpiresIn),
    refreshTokenExpiresDate: new Date(now + refreshTokenexpiresIn),
  };

  return successResponse(loginResponse, 200);
};

const loginWithRefreshToken = async (
  loginWithRefreshDto: LoginWithRefreshTokenDto
): Promise<ResponseDto<LoginResponseDto>> => {
  const refreshToken = await prisma.userRefreshToken.findUnique({
    where: { token: loginWithRefreshDto.refreshToken },
    include: {
      user: {
        include: {
          roles: {
            include: { permissions: true },
          },
        },
      },
    },
  });

  if (!refreshToken) {
    return errorResponse(["Invalid refresh token"], 400);
  }

  if (refreshToken.expiresAt < new Date()) {
    return errorResponse(["Refresh token expired"], 400);
  }

  const userSession: UserSession = {
    id: refreshToken.user.id,
    email: refreshToken.user.email,
    roles: refreshToken.user.roles.map((r) => r.name),
    permissions: [
      ...new Set(
        refreshToken.user.roles.flatMap((r) =>
          r.permissions.map((p) => p.id as Permission)
        )
      ),
    ],
  };

  const accessToken = signToken(userSession);
  const newRefreshToken = crypto.randomUUID();
  const now = Date.now();

  await prisma.userRefreshToken.update({
    where: { id: refreshToken.id },
    data: {
      token: newRefreshToken,
      expiresAt: new Date(now + refreshTokenexpiresIn),
    },
  });

  const loginResponse: LoginResponseDto = {
    accessToken,
    refreshToken: newRefreshToken,
    accessTokenExpiresDate: new Date(now + jwtExpiresIn),
    refreshTokenExpiresDate: new Date(now + refreshTokenexpiresIn),
  };

  return successResponse(loginResponse, 200);
};

const revokeRefreshToken = async (
  revokeRefreshTokenDto: LoginWithRefreshTokenDto
): Promise<ResponseDto<string>> => {
  const refreshToken = await prisma.userRefreshToken.findUnique({
    where: { token: revokeRefreshTokenDto.refreshToken },
  });

  if (!refreshToken) {
    return errorResponse(["Invalid refresh token"], 400);
  }

  await prisma.userRefreshToken.delete({
    where: { token: revokeRefreshTokenDto.refreshToken },
  });

  return successResponse("Refresh token revoked successfully", 200);
};

const register = async (
  createDto: RegisterDto
): Promise<ResponseDto<UserDto>> => {
  const userFromdb = await prisma.user.create({
    data: { ...createDto, password: bcrypt.hashSync(createDto.password, 10) },
    include: {
      roles: {
        include: { permissions: true },
      },
    },
  });
  const userDto: UserDto = { ...userFromdb };
  return successResponse(userDto, 201);
};

async function verifyPassword(
  password: string,
  hashedPassword: string
): Promise<boolean> {
  return await bcrypt.compare(password, hashedPassword);
}

export default {
  login,
  loginWithRefreshToken,
  revokeRefreshToken,
  register,
};
