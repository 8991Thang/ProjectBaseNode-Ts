import { Router } from "express";
import { createUserController } from "@src/controllers/user.controller";

const userRouter = Router();
// userRouter
//   .route("/auth")
//   // .get(checkTokenMiddleware, getUserController)
//   .get(getUserController)
//   .patch(checkTokenMiddleware, validateMiddleware(updateUserSchema), updateInfoUserController);
userRouter.route("/auth/register").post(createUserController);

// userRouter.route("/auth/register").post(validateMiddleware(createUserSchema), createUserController);

// userRouter.route("/auth/login").post(validateMiddleware(loginUserSchema), loginUserHandleController);
// userRouter.route("/auth/refresh-token").post(validateMiddleware(refreshTokenUserSchema), refreshTokenUserController);

export default userRouter;
