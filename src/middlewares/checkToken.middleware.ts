import config from "config"
import { verifyToken } from "@src/utils/jwt.utils";
import ErrorHandler from "@src/utils/response.utils";
import { NextFunction, Response, Request } from "express";

export const checkTokenMiddleware = (req: Request, res: Response, next: NextFunction) => {
    try {
        const { authorization } = req.headers;
        if (!authorization) {
            throw new ErrorHandler(
                401,
                'You must send an Authorization header',
            );
        }
        const [authType, token] = authorization.trim().split(' ');
        if (authType !== 'Bearer') {
            throw new ErrorHandler(401, 'Expected a Bearer token');
        }
        const user = verifyToken(token, config.get("secretKeyAccessToken"));
        res.locals.userData = user
        return next()
    } catch (error) {
        if (error.name === 'TokenExpiredError') {
            return next(new ErrorHandler(401, error.message));
        }
        return next(error);
    }
}