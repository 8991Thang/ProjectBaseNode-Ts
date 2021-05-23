import log from '@src/logger';
import dotenv from "dotenv-safe";
import express from "express";
import dependencies from '@src/config/dependencies';
import { routesConfig } from './config/routes';
import dbConnect from "./db";
import errorHandler from "@src/middlewares/errorHandler.middleware"
dotenv.config()
const app = express();
const port = process.env.PORT || 8000
dependencies(app)
routesConfig(app)
app.use(errorHandler)
app.listen(port, () => {
    log.info(`App running on port ${port}`)
    dbConnect()
})