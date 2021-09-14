"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.refreshTokenUserController = exports.updateInfoUserController = exports.getUserController = exports.loginUserHandleController = exports.createUserController = void 0;
const http_status_codes_1 = require("http-status-codes");
const user_service_1 = require("@src/services/user.service");
const createUserController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield user_service_1.createUserService(req.body);
        return res.status(http_status_codes_1.StatusCodes.CREATED).json({ data: user });
    }
    catch (err) {
        return next(err);
    }
});
exports.createUserController = createUserController;
const loginUserHandleController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield user_service_1.loginUserService(req.body);
        return res.status(http_status_codes_1.StatusCodes.OK).json({ data: user });
    }
    catch (err) {
        return next(err);
    }
});
exports.loginUserHandleController = loginUserHandleController;
const getUserController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield user_service_1.getInfoUserService(res.locals.userData._id);
        return res.status(http_status_codes_1.StatusCodes.OK).json(user);
    }
    catch (err) {
        return next(err);
    }
});
exports.getUserController = getUserController;
const updateInfoUserController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield user_service_1.updateInfoUserService(res.locals.userData._id, req.body);
        return res.status(http_status_codes_1.StatusCodes.OK).json(user);
    }
    catch (err) {
        return next(err);
    }
});
exports.updateInfoUserController = updateInfoUserController;
const refreshTokenUserController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield user_service_1.refreshAccessTokenService(req.body);
        return res.status(http_status_codes_1.StatusCodes.OK).json(user);
    }
    catch (err) {
        return next(err);
    }
});
exports.refreshTokenUserController = refreshTokenUserController;
