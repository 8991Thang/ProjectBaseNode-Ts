import config from "config";
import { verifyToken } from "@src/utils/jwt.utils";
import ErrorHandler from "@src/utils/response.utils";
import { NextFunction, Response, Request } from "express";
import { StatusCodes } from "http-status-codes";
import { messageConfig } from "@src/config/messageConfig";

export const checkTokenMiddleware = (req: Request, res: Response, next: NextFunction) => {
  try {
    const { authorization } = req.headers;

    if (!authorization) {
      throw new ErrorHandler(StatusCodes.UNAUTHORIZED, messageConfig.authTokenRequired);
    }

    const [authType, token] = authorization.trim().split(" ");

    if (authType !== "Bearer") {
      throw new ErrorHandler(StatusCodes.UNAUTHORIZED, messageConfig.authTokenType);
    }
    const user = verifyToken(token, config.get("secretKeyAccessToken"));
    res.locals.userData = user;
    return next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return next(new ErrorHandler(StatusCodes.UNAUTHORIZED, error.message));
    }
    return next(error);
  }
};
