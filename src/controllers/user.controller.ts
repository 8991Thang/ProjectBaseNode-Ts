import log from '@src/logger';
import { createUserService, getInfoUserService, loginUserService, refreshAccessTokenService, updateInfoUserService } from "@src/services/user.service"
import { NextFunction, Request, Response } from "express"
import { StatusCodes } from "http-status-codes"
import { getRepository } from "typeorm";
import { User } from "@src/entity/User";

export const createUserController = async (req: Request, res: Response,next: NextFunction) => {
    try {
        const userDefault = {
            name: "thang"
        }
        const resultUser = getRepository(User).create(userDefault)
        const user = getRepository(User).save(resultUser)
        return res.status(StatusCodes.CREATED).json({ data: user })
    } catch (err) {
        return next(err)
    }
}

export const loginUserHandleController = async (req: Request, res: Response,next: NextFunction) => {
    try {
        const user = await loginUserService(req.body)
        return res.status(StatusCodes.OK).json({ data: user })
    } catch (err) {
        return next(err)
    }
}
export const getUserController = async (req: Request, res: Response,next: NextFunction) => {
    try {
        const user = getRepository(User).find()
        return res.status(StatusCodes.OK).json(user)
    } catch (err) {
        return next(err)
    }
}

export const updateInfoUserController = async (req: Request, res: Response,next: NextFunction) => {
    try {
        const user = await updateInfoUserService(res.locals.userData._id, req.body)
        return res.status(StatusCodes.OK).json(user)
    } catch (err) {
        return next(err)
    }
}

export const refreshTokenUserController = async (req: Request, res: Response,next: NextFunction) => {
    try {
        const user = await refreshAccessTokenService(req.body)
        return res.status(StatusCodes.OK).json(user)
    } catch (err) {
        return next(err)
    }
}