"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.decodeToken = exports.verifyToken = exports.signToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const signToken = (object, privateKey, options) => {
    return jsonwebtoken_1.default.sign(object, privateKey, options);
};
exports.signToken = signToken;
const verifyToken = (token, privateKey, options) => {
    return jsonwebtoken_1.default.verify(token, privateKey, options);
};
exports.verifyToken = verifyToken;
const decodeToken = (token) => {
    return jsonwebtoken_1.default.decode(token);
};
exports.decodeToken = decodeToken;
