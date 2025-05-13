import { RoleCreateDto, RoleUpdateDto, RoleDto } from "./role.dto";
import { prisma } from "../../app";
import {
  errorResponse,
  ResponseDto,
  successResponse,
} from "../../models/response.dto";
import { TFunction } from "i18next";

const getAll = async (t: TFunction): Promise<ResponseDto<RoleDto[]>> => {
  const roles = await prisma.role.findMany({
    include: {
      permissions: true,
    },
  });
  const roleDtos: RoleDto[] = roles.map((user) => ({ ...user } as RoleDto));
  return successResponse(roleDtos, 200);
};

const get = async (id: string, t: TFunction): Promise<ResponseDto<RoleDto>> => {
  const role = await prisma.role.findUnique({
    where: { id: id },
    include: { permissions: true },
  });

  if (!role) {
    return errorResponse([t("user_not_found")], 404);
  }

  const roleDto: RoleDto = { ...role };
  return successResponse(roleDto, 200);
};

const create = async (
  createDto: RoleCreateDto,
  t: TFunction
): Promise<ResponseDto<RoleDto>> => {
  const roleFromdb = await prisma.role.create({
    data: {
      ...createDto,
      permissions: {
        connect: createDto.permissions.map((p) => ({
          id: p,
        })),
      },
    },
    include: { permissions: true },
  });
  const roleDto: RoleDto = { ...roleFromdb };
  return successResponse(roleDto, 201);
};

const update = async (
  id: string,
  updateDto: RoleUpdateDto,
  t: TFunction
): Promise<ResponseDto<RoleDto>> => {
  const role = await prisma.role.findUnique({ where: { id: id } });

  if (!role) {
    return errorResponse([t("role_not_found")], 404);
  }

  const updatedRole = await prisma.role.update({
    where: { id: id },
    data: {
      ...updateDto,
      permissions: {
        set: [],
        connect: updateDto.permissions.map((p) => ({
          id: p,
        })),
      },
    },
    include: { permissions: true },
  });

  const roleDto: RoleDto = { ...updatedRole };
  return successResponse(roleDto, 200);
};

const remove = async (id: string, t: TFunction): Promise<ResponseDto<null>> => {
  const role = await prisma.role.findUnique({ where: { id: id } });

  if (!role) {
    return errorResponse([t("role_not_found")], 404);
  }

  await prisma.role.delete({ where: { id: id } });
  return successResponse(null, 200);
};

export default {
  getAll,
  get,
  create,
  update,
  remove,
};
