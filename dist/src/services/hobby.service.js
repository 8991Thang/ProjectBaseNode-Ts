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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getHobbyServices = exports.createHobbyServices = void 0;
const hobby_model_1 = __importDefault(require("@src/models/hobby.model"));
const response_utils_1 = require("@src/utils/response.utils");
const http_status_codes_1 = require("http-status-codes");
const createHobbyServices = (_dataHobby) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield hobby_model_1.default.create(_dataHobby);
        return response_utils_1.handleResponse(http_status_codes_1.StatusCodes.CREATED, "Create hobby successfully!!");
    }
    catch (error) {
        throw error;
    }
});
exports.createHobbyServices = createHobbyServices;
const getHobbyServices = (oftionQuery) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const typeOfHobby = {
            typeOfHobby: oftionQuery.typeOfHobby
        };
        const sortType = oftionQuery.typeSort === "asc" ? 1 : -1;
        const options = Object.assign(Object.assign({}, oftionQuery), { sort: { [oftionQuery.sort]: sortType } });
        const hobbyList = yield hobby_model_1.default.paginate(oftionQuery.typeOfHobby ? typeOfHobby : {}, options);
        return response_utils_1.handleResponse(http_status_codes_1.StatusCodes.OK, "Get hobby successfully!!", hobbyList);
    }
    catch (error) {
        throw error;
    }
});
exports.getHobbyServices = getHobbyServices;
