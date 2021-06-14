import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { QueryFailedError } from "typeorm";
import logger from "@src/logger";
import ErrorHandler from "@src/utils/response.utils";

export default (error: ErrorHandler | any, req: Request, res: Response, next: NextFunction) => {
  if (error instanceof ErrorHandler) {
    logger.error(error, "errorHandler middleware ErrorHandler");
    return res.status(error.status).json({ message: error.message });
  }
  if (error instanceof QueryFailedError) {
    logger.error(error, "errorHandler middleware QueryFailedError");
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message });
  }
  const message = error.message || "Something went wrong";
  logger.error({ message }, "error middleware");
  return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message });
};
