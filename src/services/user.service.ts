import { signToken, verifyToken } from '@src/utils/jwt.utils';
import { StatusCodes } from 'http-status-codes';
import config from "config";
import User, { UserDocument } from "@src/models/user.model"
import { DocumentDefinition } from "mongoose"
import _ from 'lodash';
import ErrorHandler, { handleResponse } from '@src/utils/response.utils';
import { IDecodeTokenUser, IToken } from '@src/types/user.type';

export const createUserService = async (_user: DocumentDefinition<UserDocument>) => {
    try {
        const user = await User.create(_user)
        return  handleResponse(StatusCodes.CREATED, "Register User Successfully!", _.omit(user.toJSON(), "password")) ;
    } catch (error) {
        throw new ErrorHandler(StatusCodes.INTERNAL_SERVER_ERROR, error)
    }
}


export const loginUserService = async (_user: DocumentDefinition<UserDocument>) => {
    try {
        const user = await User.findOne({ email: _user.email })
        if (user) {
            const comparePassword = await user.comparePassword(_user.password);
            if (!comparePassword) {
                throw new ErrorHandler(StatusCodes.INTERNAL_SERVER_ERROR, "Password mismatch!!")
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
        throw new ErrorHandler(StatusCodes.INTERNAL_SERVER_ERROR, "Email haven't exits!")
    } catch (error) {
        throw error
    }
}

export const getInfoUserService = async (_userId: string) => {
    try {
        const user = await User.findById({ _id: _userId }, "-password -createdAt -__v -updatedAt").populate("hobby")
        return handleResponse(StatusCodes.OK, "Get user information successfully", user)
    } catch (error) {
        throw error
    }
}

export const updateInfoUserService = async (_userId: string, _dataUser: DocumentDefinition<UserDocument>) => {
    try {
        const userFound = await User.findOne({ _id: _userId })
        if(!userFound){
            throw new ErrorHandler(StatusCodes.INTERNAL_SERVER_ERROR, "User does not exist!!")
        }
        const user = await User.updateOne({ _id: _userId }, _dataUser, { new: true }).select("-password").lean()
        return handleResponse(StatusCodes.OK, "Update user information successfully", user)
    } catch (error) {
        throw new ErrorHandler(StatusCodes.INTERNAL_SERVER_ERROR, error)
    }
}


export const refreshAccessTokenService = async (_token: IToken) => {
    try {
     const {_id,email} = verifyToken(_token.refreshToken,config.get("secretKeyRefreshToken")) as IDecodeTokenUser
     if(email && _id){
        const user = await User.findOne({ _id,email  }).select("-password").lean()
        if(!user){
            throw new ErrorHandler(StatusCodes.INTERNAL_SERVER_ERROR,"User does not exist!!")
        }
        const getNewAccessToken = signToken({ _id, email}, config.get("secretKeyAccessToken"), { 
            expiresIn: config.get("expiredAccessToken")
        })
        const token = {
            refreshToken : _token.refreshToken,
            accessToken : getNewAccessToken
        }
        return handleResponse(StatusCodes.OK, "Get Accesstoken successfully", token)
     }
       
    } catch (error) {
        throw error
    }
}