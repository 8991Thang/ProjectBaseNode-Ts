"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.refreshAccessTokenService = exports.updateInfoUserService = exports.getInfoUserService = exports.loginUserService = exports.createUserService = void 0;
const jwt_utils_1 = require("@src/utils/jwt.utils");
const http_status_codes_1 = require("http-status-codes");
const config_1 = __importDefault(require("config"));
const user_model_1 = __importDefault(require("@src/models/user.model"));
const lodash_1 = __importDefault(require("lodash"));
const response_utils_1 = __importStar(require("@src/utils/response.utils"));
const createUserService = (_user) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield user_model_1.default.create(_user);
        return response_utils_1.handleResponse(http_status_codes_1.StatusCodes.CREATED, "Register User Successfully!", lodash_1.default.omit(user.toJSON(), "password"));
    }
    catch (error) {
        if (error.name === "MongoError" && error.code === 11000) {
            throw new response_utils_1.default(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR, "User already exist!");
        }
        throw new response_utils_1.default(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR, error);
    }
});
exports.createUserService = createUserService;
const loginUserService = (_user) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield user_model_1.default.findOne({ email: _user.email });
        if (user) {
            const comparePassword = yield user.comparePassword(_user.password);
            if (!comparePassword) {
                throw new response_utils_1.default(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR, "Password mismatch!!");
            }
            const { _id, email } = user;
            const accessToken = jwt_utils_1.signToken({ _id, email }, config_1.default.get("secretKeyAccessToken"), {
                expiresIn: config_1.default.get("expiredAccessToken"),
            });
            const refreshToken = jwt_utils_1.signToken({ _id, email }, config_1.default.get("secretKeyRefreshToken"), {
                expiresIn: config_1.default.get("expiredRefreshToken"),
            });
            return { accessToken, refreshToken };
        }
        throw new response_utils_1.default(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR, "Email haven't exits!");
    }
    catch (error) {
        throw error;
    }
});
exports.loginUserService = loginUserService;
const getInfoUserService = (_userId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield user_model_1.default.findById({ _id: _userId }, "-password -createdAt -__v -updatedAt").populate("hobby");
        return response_utils_1.handleResponse(http_status_codes_1.StatusCodes.OK, "Get user information successfully", user);
    }
    catch (error) {
        throw error;
    }
});
exports.getInfoUserService = getInfoUserService;
const updateInfoUserService = (_userId, _dataUser) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userFound = yield user_model_1.default.findOne({ _id: _userId });
        if (!userFound) {
            throw new response_utils_1.default(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR, "User does not exist!!");
        }
        const user = yield user_model_1.default.updateOne({ _id: _userId }, _dataUser, { new: true }).select("-password").lean();
        return response_utils_1.handleResponse(http_status_codes_1.StatusCodes.OK, "Update user information successfully", user);
    }
    catch (error) {
        throw new response_utils_1.default(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR, error);
    }
});
exports.updateInfoUserService = updateInfoUserService;
const refreshAccessTokenService = (_token) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { _id, email } = jwt_utils_1.verifyToken(_token.refreshToken, config_1.default.get("secretKeyRefreshToken"));
        if (email && _id) {
            const user = yield user_model_1.default.findOne({ _id, email }).select("-password").lean();
            if (!user) {
                throw new response_utils_1.default(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR, "User does not exist!!");
            }
            const getNewAccessToken = jwt_utils_1.signToken({ _id, email }, config_1.default.get("secretKeyAccessToken"), {
                expiresIn: config_1.default.get("expiredAccessToken"),
            });
            const token = {
                refreshToken: _token.refreshToken,
                accessToken: getNewAccessToken,
            };
            return response_utils_1.handleResponse(http_status_codes_1.StatusCodes.OK, "Get Accesstoken successfully", token);
        }
    }
    catch (error) {
        throw error;
    }
});
exports.refreshAccessTokenService = refreshAccessTokenService;
