/* eslint-disable no-param-reassign */
/* eslint-disable no-useless-catch */
import bcrypt from "bcrypt";
import config from "config";
import { StatusCodes } from "http-status-codes";
import _ from "lodash";
import { getConnection, getRepository } from "typeorm";
import ErrorHandler, { handleResponse, IResponse } from "@src/utils/response.utils";
import { signToken, verifyToken } from "@src/utils/jwt.utils";
import { IDecodeTokenUser, IToken, IUser } from "@src/types/user.type";
import UserEntity from "@src/entity/User";

export const loginUserService = async (_user: IUser) => {
  try {
    const user = await getRepository(UserEntity).findOne({ email: _user.email });
    if (user) {
      const comparePassword = await bcrypt.compare(_user.password, user.password);
      if (!comparePassword) {
        throw new ErrorHandler(StatusCodes.INTERNAL_SERVER_ERROR, "Password mismatch!!");
      }
      const { id, email } = user;
      const accessToken = signToken({ id, email }, config.get("secretKeyAccessToken"), {
        expiresIn: config.get("expiredAccessToken"),
      });
      const refreshToken = signToken({ id, email }, config.get("secretKeyRefreshToken"), {
        expiresIn: config.get("expiredRefreshToken"),
      });
      return { accessToken, refreshToken };
    }
    throw new ErrorHandler(StatusCodes.INTERNAL_SERVER_ERROR, "Email haven't exits!");
  } catch (error) {
    throw error;
  }
};

export const getInfoUserService = async (_userId: string) => {
  try {
    const user = await getRepository(UserEntity).findOne({
      where: {
        id: _userId,
      },
      relations: ["hobbys"],
    });
    if (user) {
      return handleResponse(
        StatusCodes.OK,
        "Get user information successfully",
        _.omit(user, "password"),
      );
    }
    throw new ErrorHandler(StatusCodes.INTERNAL_SERVER_ERROR, "User not found");
  } catch (error) {
    throw error;
  }
};

export const updateInfoUserService = async (_userId: string, _dataUser: IUser) => {
  try {
    const userFound = await getRepository(UserEntity).findOne(_userId);
    if (!userFound) {
      throw new ErrorHandler(StatusCodes.INTERNAL_SERVER_ERROR, "User does not exist!!");
    }
    const newDataUser = Object.assign(userFound, _dataUser);
    const user = await getConnection().getRepository(UserEntity).save(newDataUser);
    return handleResponse(StatusCodes.OK, "Update user information successfully", user);
  } catch (error) {
    throw new ErrorHandler(StatusCodes.INTERNAL_SERVER_ERROR, error);
  }
};

export const refreshAccessTokenService = async (_token: IToken) => {
  try {
    const { id, email } = verifyToken(
      _token.refreshToken,
      config.get("secretKeyRefreshToken"),
    ) as IDecodeTokenUser;
    if (email && id) {
      const user = await getRepository(UserEntity).findOne({
        where: {
          id,
          email,
        },
      });
      if (!user) {
        throw new ErrorHandler(StatusCodes.INTERNAL_SERVER_ERROR, "User does not exist!!");
      }
      const getNewAccessToken = signToken({ id, email }, config.get("secretKeyAccessToken"), {
        expiresIn: config.get("expiredAccessToken"),
      });
      const token = {
        refreshToken: _token.refreshToken,
        accessToken: getNewAccessToken,
      };
      return handleResponse(StatusCodes.OK, "Get Accesstoken successfully", token);
    }
  } catch (error) {
    throw error;
  }
};

export const createUserService = async (_user: any): Promise<IResponse<IUser>> => {
  try {
    const resultUser = getRepository(UserEntity).create(_user);
    const user = await getRepository(UserEntity).save(resultUser);
    return handleResponse(
      StatusCodes.CREATED,
      "Register User Successfully!",
      _.omit(user, "password"),
    );
  } catch (error) {
    throw new ErrorHandler(StatusCodes.INTERNAL_SERVER_ERROR, error);
  }
};
