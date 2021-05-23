import logger from '@src/logger';
import ErrorHandler from "@src/utils/response.utils"
import { log } from 'console';
import { NextFunction, Request, Response } from "express";
import { StatusCodes } from 'http-status-codes';
export default (error: ErrorHandler | any, req: Request, res: Response, next: NextFunction) => {
    if (error instanceof ErrorHandler) {
        logger.error(error, "errorHandler  middleware");
        return res.status(error.status).json({ message: error.message });
    }
    const message = error.message || 'Something went wrong';
    logger.error({ message }, "error middleware");
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message });
};