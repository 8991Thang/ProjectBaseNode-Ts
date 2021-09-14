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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const checkToken_middleware_1 = require("@src/middlewares/checkToken.middleware");
const validateRequest_middleware_1 = __importDefault(require("@src/middlewares/validateRequest.middleware"));
const hobby_controller_1 = __importStar(require("@src/controllers/hobby.controller"));
const express_1 = require("express");
const hobby_schema_1 = require("@src/schema/hobby.schema");
const hobbyRoute = express_1.Router();
hobbyRoute.use("/hobby", checkToken_middleware_1.checkTokenMiddleware);
hobbyRoute.route("/hobby")
    .post(validateRequest_middleware_1.default(hobby_schema_1.createHobbySchema), hobby_controller_1.default)
    .get(validateRequest_middleware_1.default(hobby_schema_1.queryHobbySchema), hobby_controller_1.getHobbyController);
exports.default = hobbyRoute;
