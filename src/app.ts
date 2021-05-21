import log from '@src/logger';
import dotenv from "dotenv-safe";
import express from "express";
import morgan from "morgan";
import { routesConfig } from './../config/routes';
import dbConnect from "./db";
dotenv.config()
const app = express();
const port = process.env.PORT || 8000
app.use(morgan("dev"))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
routesConfig(app)
app.listen(port, () => {
    log.info(`App running on port ${port}`)
    dbConnect()
})