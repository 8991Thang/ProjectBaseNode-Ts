"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const logger_1 = __importDefault(require("@src/logger"));
const response_utils_1 = __importDefault(require("@src/utils/response.utils"));
const http_status_codes_1 = require("http-status-codes");
exports.default = (error, req, res, next) => {
    if (!req.route)
        return next(new Error("404"));
    if (error instanceof response_utils_1.default) {
        logger_1.default.error(error, "errorHandler middleware");
        return res.status(error.status).json({ message: error.message });
    }
    const message = error.message || "Something went wrong";
    logger_1.default.error({ message }, "error middleware");
    return res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json({ message });
};
