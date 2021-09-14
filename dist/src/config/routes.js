"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.routesConfig = void 0;
const book_route_1 = __importDefault(require("@src/routes/book.route"));
const hobby_route_1 = __importDefault(require("@src/routes/hobby.route"));
const user_route_1 = __importDefault(require("@src/routes/user.route"));
const routesConfig = (app) => {
    app.use('/api', [
        user_route_1.default,
        book_route_1.default,
        hobby_route_1.default
    ]);
};
exports.routesConfig = routesConfig;
