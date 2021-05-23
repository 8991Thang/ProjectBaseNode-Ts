import { createUserController, getUserController, loginUserHandleController, updateInfoUserController } from '@src/controllers/user.controller';
import { checkTokenMiddleware } from '@src/middlewares/checkToken.middleware';
import validateMiddleware from '@src/middlewares/validateRequest.middleware';
import { createUserSchema, loginUserSchema, updateUserSchema } from '@src/schema/user.schema';
import { Router } from 'express'

const userRouter = Router();
userRouter.route("/auth")
    .get(checkTokenMiddleware, getUserController)
    .patch(checkTokenMiddleware, validateMiddleware(updateUserSchema), updateInfoUserController)
userRouter.route("/auth/register").post(validateMiddleware(createUserSchema), createUserController)
userRouter.route("/auth/login").post(validateMiddleware(loginUserSchema), loginUserHandleController)

export default userRouter