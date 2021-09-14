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
exports.getHobbyController = void 0;
const hobby_service_1 = require("@src/services/hobby.service");
const http_status_codes_1 = require("http-status-codes");
const createHobbyController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const hobby = yield hobby_service_1.createHobbyServices(req.body);
        res.status(http_status_codes_1.StatusCodes.CREATED).json(hobby);
    }
    catch (error) {
        next(error);
    }
});
const getHobbyController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const queryHobby = req.query;
        const hobby = yield hobby_service_1.getHobbyServices(queryHobby);
        res.status(http_status_codes_1.StatusCodes.OK).json(hobby);
    }
    catch (error) {
        next(error);
    }
});
exports.getHobbyController = getHobbyController;
exports.default = createHobbyController;
