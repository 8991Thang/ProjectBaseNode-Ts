import { Router } from "express";
import {
  createUserController,
  getUserController,
  loginUserHandleController,
  refreshTokenUserController,
  updateInfoUserController,
} from "@src/controllers/user.controller";
import validateMiddleware from "@src/middlewares/validateRequest.middleware";
import {
  createUserSchema,
  loginUserSchema,
  refreshTokenUserSchema,
  updateUserSchema,
} from "@src/schema/user.schema";
import { checkTokenMiddleware } from "@src/middlewares/checkToken.middleware";

const userRouter = Router();
userRouter
  .route("/auth")
  .get(checkTokenMiddleware, getUserController)
  .patch(checkTokenMiddleware, validateMiddleware(updateUserSchema), updateInfoUserController);

userRouter.route("/auth/register").post(validateMiddleware(createUserSchema), createUserController);

userRouter
  .route("/auth/login")
  .post(validateMiddleware(loginUserSchema), loginUserHandleController);
userRouter
  .route("/auth/refresh-token")
  .post(validateMiddleware(refreshTokenUserSchema), refreshTokenUserController);

export default userRouter;
