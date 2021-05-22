import { createUserHandle, loginUserHandle } from '@src/controllers/user.controller';
import validateMiddleware from '@src/middlewares/validateRequest.middleware';
import { createUserSchema, loginUserSchema } from '@src/schema/user.schema';
import { Router } from 'express'

const userRouter = Router();
userRouter.route("/auth/register").post(validateMiddleware(createUserSchema), createUserHandle)
userRouter.route("/auth/login").post(validateMiddleware(loginUserSchema), loginUserHandle)
export default userRouter