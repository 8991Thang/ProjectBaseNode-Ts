"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_controller_1 = require("@src/controllers/user.controller");
const checkToken_middleware_1 = require("@src/middlewares/checkToken.middleware");
const validateRequest_middleware_1 = __importDefault(require("@src/middlewares/validateRequest.middleware"));
const user_schema_1 = require("@src/schema/user.schema");
const express_1 = require("express");
const userRouter = express_1.Router();
userRouter
    .route("/auth")
    .get(checkToken_middleware_1.checkTokenMiddleware, user_controller_1.getUserController)
    .patch(checkToken_middleware_1.checkTokenMiddleware, validateRequest_middleware_1.default(user_schema_1.updateUserSchema), user_controller_1.updateInfoUserController);
userRouter.route("/auth/register").post(validateRequest_middleware_1.default(user_schema_1.createUserSchema), user_controller_1.createUserController);
userRouter.route("/auth/login").post(validateRequest_middleware_1.default(user_schema_1.loginUserSchema), user_controller_1.loginUserHandleController);
userRouter
    .route("/auth/refresh-token")
    .post(checkToken_middleware_1.checkTokenMiddleware, validateRequest_middleware_1.default(user_schema_1.refreshTokenUserSchema), user_controller_1.refreshTokenUserController);
exports.default = userRouter;
