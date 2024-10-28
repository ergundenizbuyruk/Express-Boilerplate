export interface UserDto {
  id: number;
  email: string;
  name: string;
  surname: string;
  password: string;
  posts: any[];
}

export interface UserCreateDto {
  name: string;
  surname: string;
  email: string;
  password: string;
}

export interface UserUpdateDto {
  name: string;
  surname: string;
  email: string;
  password: string;
}
