import log from '@src/logger';
import { createUser, loginUser } from "@src/services/user.service"
import { Request, Response } from "express"
import { StatusCodes } from "http-status-codes"

export const createUserHandle = async (req: Request, res: Response) => {
    try {
        const user = await createUser(req.body)
        return res.status(StatusCodes.CREATED).json({ data: user })
    } catch (err) {
        log.error(err.message)
        res.status(StatusCodes.BAD_REQUEST).json({ error: err?.message })
    }
}


export const loginUserHandle = async (req: Request, res: Response) => {
    try {
        const user = await loginUser(req.body)
        return res.status(StatusCodes.OK).json({ data: user })
    } catch (err) {
        log.error(err.message)
        res.status(StatusCodes.BAD_REQUEST).json({ error: err?.message })
    }
}
