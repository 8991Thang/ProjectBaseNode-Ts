import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import {
  createUserService,
  getInfoUserService,
  loginUserService,
  refreshAccessTokenService,
  updateInfoUserService,
} from "@src/services/user.service";

export const createUserController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await createUserService(req.body);
    return res.status(StatusCodes.CREATED).json({ data: user });
  } catch (err) {
    return next(err);
  }
};

export const loginUserHandleController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await loginUserService(req.body);
    return res.status(StatusCodes.OK).json({ data: user });
  } catch (err) {
    return next(err);
  }
};
export const getUserController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await getInfoUserService(res.locals.userData._id);
    return res.status(StatusCodes.OK).json(user);
  } catch (err) {
    return next(err);
  }
};

export const updateInfoUserController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await updateInfoUserService(res.locals.userData._id, req.body);
    return res.status(StatusCodes.OK).json(user);
  } catch (err) {
    return next(err);
  }
};

export const refreshTokenUserController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await refreshAccessTokenService(req.body);
    return res.status(StatusCodes.OK).json(user);
  } catch (err) {
    return next(err);
  }
};
