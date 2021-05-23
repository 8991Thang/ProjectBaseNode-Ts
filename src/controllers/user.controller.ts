import log from '@src/logger';
import { createUserService, getInfoUserService, loginUserService, updateInfoUserService } from "@src/services/user.service"
import { Request, Response } from "express"
import { StatusCodes } from "http-status-codes"

export const createUserController = async (req: Request, res: Response) => {
    try {
        const user = await createUserService(req.body)
        return res.status(StatusCodes.CREATED).json({ data: user })
    } catch (err) {
        log.error(err.message, "createUserHandle")
        res.status(StatusCodes.BAD_REQUEST).json({ error: err?.message })
    }
}

export const loginUserHandleController = async (req: Request, res: Response) => {
    try {
        const user = await loginUserService(req.body)
        return res.status(StatusCodes.OK).json({ data: user })
    } catch (err) {
        log.error(err.message, "loginUserHandle")
        res.status(StatusCodes.BAD_REQUEST).json({ error: err?.message })
    }
}
export const getUserController = async (req: Request, res: Response) => {
    try {
        const user = await getInfoUserService(res.locals.userData._id)
        return res.status(StatusCodes.OK).json(user)
    } catch (err) {
        log.error(err.message, "createUserHandle")
        res.status(StatusCodes.BAD_REQUEST).json({ error: err?.message })
    }
}

export const updateInfoUserController = async (req: Request, res: Response) => {
    try {
        const user = await updateInfoUserService(res.locals.userData._id, req.body)
        return res.status(StatusCodes.OK).json(user)
    } catch (err) {
        log.error(err.message, "createUserHandle")
        res.status(StatusCodes.BAD_REQUEST).json({ error: err?.message })
    }
}
