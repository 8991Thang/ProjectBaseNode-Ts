"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkTokenMiddleware = void 0;
const config_1 = __importDefault(require("config"));
const jwt_utils_1 = require("@src/utils/jwt.utils");
const response_utils_1 = __importDefault(require("@src/utils/response.utils"));
const http_status_codes_1 = require("http-status-codes");
const messageConfig_1 = require("@src/config/messageConfig");
const checkTokenMiddleware = (req, res, next) => {
    try {
        const { authorization } = req.headers;
        if (!authorization) {
            throw new response_utils_1.default(http_status_codes_1.StatusCodes.UNAUTHORIZED, messageConfig_1.messageConfig.authTokenRequired);
        }
        const [authType, token] = authorization.trim().split(" ");
        if (authType !== "Bearer") {
            throw new response_utils_1.default(http_status_codes_1.StatusCodes.UNAUTHORIZED, messageConfig_1.messageConfig.authTokenType);
        }
        const user = jwt_utils_1.verifyToken(token, config_1.default.get("secretKeyAccessToken"));
        res.locals.userData = user;
        return next();
    }
    catch (error) {
        if (error.name === "TokenExpiredError") {
            return next(new response_utils_1.default(http_status_codes_1.StatusCodes.UNAUTHORIZED, error.message));
        }
        return next(error);
    }
};
exports.checkTokenMiddleware = checkTokenMiddleware;
