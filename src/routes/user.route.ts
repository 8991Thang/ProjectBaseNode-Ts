import { createUserHandle } from '@src/controllers/user.controller';
import validateMiddleware from '@src/middlewares/validateRequest.middleware';
import { createUserSchema } from '@src/schema/user.schema';
import { Router } from 'express'

const userRouter = Router();
userRouter.route("/auth/register").post(validateMiddleware(createUserSchema), createUserHandle)

export default userRouter