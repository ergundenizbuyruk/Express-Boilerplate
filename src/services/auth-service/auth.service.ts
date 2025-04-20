import { prisma } from "../../index";
import {
  errorResponse,
  ResponseDto,
  successResponse,
} from "../../models/response.dto.js";
import { UserSession } from "../../models/user-session.dto.js";
import { Permission } from "../../types/permission.js";
import {
  jwtExpiresIn,
  refreshTokenexpiresIn,
  signToken,
} from "../../utils/jwt.js";
import {
  LoginDto,
  LoginResponseDto,
  RegisterDto,
  UserDto,
} from "./auth.dto.js";
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

  const loginResponse: LoginResponseDto = {
    accessToken,
    refreshToken,
    accessTokenExpiresDate: new Date(Date.now() + jwtExpiresIn),
    refreshTokenExpiresDate: new Date(Date.now() + refreshTokenexpiresIn),
  };

  return successResponse(loginResponse, 200);
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
  register,
};
