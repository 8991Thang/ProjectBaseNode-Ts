import { decodeToken, signToken } from '@src/utils/jwt.utils';
import { StatusCodes } from 'http-status-codes';
import config from "config";
import log from '@src/logger';
import User, { UserDocument } from "@src/models/user.model"
import { DocumentDefinition } from "mongoose"
import _ from 'lodash';
import ErrorHandler, { handleResponse } from '@src/utils/response.utils';
import { IUser } from '@src/types/user.type';

export const createUserService = async (_user: DocumentDefinition<UserDocument>) => {
    try {
        const user = await User.create(_user)
        return _.omit(user.toJSON(), "password");
    } catch (error) {
        throw new ErrorHandler(500, error)
    }
}


export const loginUserService = async (_user: DocumentDefinition<UserDocument>) => {
    try {
        const user = await User.findOne({ email: _user.email })
        if (user) {
            const comparePassword = await user.comparePassword(_user.password);
            if (!comparePassword) {
                throw new ErrorHandler(500, "Password mismatch!!")
            }
            const { _id, email } = user
            const accessToken = signToken({ _id, email }, config.get("secretKeyAccessToken"), {
                expiresIn: config.get("expiredAccessToken")
            })
            const refreshToken = signToken({ _id, email }, config.get("secretKeyRefreshToken"), {
                expiresIn: config.get("expiredRefreshToken")
            })
            return { accessToken, refreshToken }
        }
        throw new ErrorHandler(500, "Email haven't exits!")
    } catch (error) {
        throw new ErrorHandler(500, error)
    }
}

export const getInfoUserService = async (_userId: string) => {
    try {
        const user = await User.findById({ _id: _userId }, "-password -createdAt -__v -updatedAt")
        return handleResponse(StatusCodes.OK, "Get user information successfully", user)
    } catch (error) {
        throw new ErrorHandler(500, error)
    }
}

export const updateInfoUserService = async (_userId: string, _dataUser: IUser) => {
    try {
        const user = await User.findOneAndUpdate({ _id: _userId }, _dataUser, { new: true }).select("-password").lean()
        return handleResponse(StatusCodes.OK, "Update user information successfully", user)
    } catch (error) {
        throw new ErrorHandler(500, error)
    }
}
export const updateHobbyUserService = async (_userId: string, _dataUser: IUser) => {
    try {
        const user = await User.updateOne({ _id: _userId }, { $addToSet: _dataUser }, { new: true }).select("-password").lean()
        return handleResponse(StatusCodes.OK, "Update user information successfully", user)
    } catch (error) {
        throw new ErrorHandler(500, error)
    }
}