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
const logger_1 = __importDefault(require("@src/logger"));
const dotenv_safe_1 = __importDefault(require("dotenv-safe"));
const express_1 = __importDefault(require("express"));
const dependencies_1 = __importDefault(require("@src/config/dependencies"));
const routes_1 = require("./config/routes");
const db_1 = __importDefault(require("./db"));
const errorHandler_middleware_1 = __importDefault(require("@src/middlewares/errorHandler.middleware"));
const swaggerConfig_1 = require("@src/config/swaggerConfig");
dotenv_safe_1.default.config();
const app = express_1.default();
const port = process.env.PORT || 8000;
dependencies_1.default(app);
routes_1.routesConfig(app);
swaggerConfig_1.swaggerConfig(app);
app.use(errorHandler_middleware_1.default);
app.listen(port, () => __awaiter(void 0, void 0, void 0, function* () {
    logger_1.default.info(`App running on port ${port}`);
    yield db_1.default();
}));
