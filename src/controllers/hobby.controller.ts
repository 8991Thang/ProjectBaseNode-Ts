import { createHobbyServices, getHobbyServices } from "@src/services/hobby.service";
import { IOftionQueryHobby } from "@src/types/hobby.type";
import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

const createHobbyController =async (req: Request, res: Response,next: NextFunction) => {
    try {
        const hobby = await createHobbyServices(req.body);
        res.status(StatusCodes.CREATED).json(hobby);
    } catch (error) {
        next(error);
    }
}

export const getHobbyController =async (req: Request, res: Response,next: NextFunction) => {
    try {
        const queryHobby = req.query as unknown as IOftionQueryHobby
        const hobby = await getHobbyServices(queryHobby);
        res.status(StatusCodes.OK).json(hobby);
    } catch (error) {
        next(error);
    }
}

export default createHobbyController