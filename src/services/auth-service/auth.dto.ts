import { RoleDto } from "../role-service/role.dto";

export interface LoginDto {
  email: string;
  password: string;
}

export interface LoginResponseDto {
  accessToken: string;
  refreshToken: string;
  accessTokenExpiresDate: Date;
  refreshTokenExpiresDate: Date;
}

export interface RegisterDto {
  firstname: string;
  surname: string;
  email: string;
  password: string;
}

export interface LoginByRefreshTokenDto {
  refreshToken: string;
}

export interface RevokeRefreshTokenDto {
  refreshToken: string;
}

export interface UserDto {
  id: number;
  firstname: string;
  surname: string;
  email: string;
  password: string;
  roles: RoleDto[];
}
