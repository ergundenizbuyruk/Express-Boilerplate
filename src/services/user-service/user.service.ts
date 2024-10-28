import { UserCreateDto, UserDto, UserUpdateDto } from "./user.dto.js";
import { prisma } from "../../index.js";
import {
  errorResponse,
  ResponseDto,
  successResponse,
} from "../../models/response.dto.js";

const getUsers = async (): Promise<ResponseDto<UserDto[]>> => {
  const users = await prisma.user.findMany();
  const userDtos = users.map((user) => ({ ...user, posts: [] }));
  return successResponse(userDtos, 200);
};

const getUser = async (id: number): Promise<ResponseDto<UserDto>> => {
  const user = await prisma.user.findUnique({ where: { id: id } });

  if (!user) {
    return errorResponse(["User not found"], 404);
  }

  const userDto = { ...user, posts: [] };
  return successResponse(userDto, 200);
};

const createUser = async (
  createDto: UserCreateDto
): Promise<ResponseDto<UserDto>> => {
  const userFromdb = await prisma.user.create({ data: { ...createDto } });
  const userDto = { ...userFromdb, posts: [] };
  return successResponse(userDto, 201);
};

const updateUser = async (
  id: number,
  updateDto: UserUpdateDto
): Promise<ResponseDto<UserDto>> => {
  const user = await prisma.user.findUnique({ where: { id: id } });

  if (!user) {
    return errorResponse(["User not found"], 404);
  }

  const updatedUser = await prisma.user.update({
    where: { id: id },
    data: updateDto,
  });

  const userDto = { ...updatedUser, posts: [] };
  return successResponse(userDto, 200);
};

const deleteUser = async (id: number): Promise<ResponseDto<null>> => {
  const user = await prisma.user.findUnique({ where: { id: id } });

  if (!user) {
    return errorResponse(["User not found"], 404);
  }

  await prisma.user.delete({ where: { id: id } });
  return successResponse(null, 200);
};

export default {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
};
