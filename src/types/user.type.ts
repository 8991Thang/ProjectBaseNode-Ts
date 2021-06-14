export interface IUser {
  id?: string;
  name: string;
  email: string;
  hobby?: [string];
  age?: number;
  address?: string;
  password: string;
}

export interface IToken {
  accessToken: string;
  refreshToken: string;
}

export interface IDecodeTokenUser {
  id: string;
  email: string;
}
