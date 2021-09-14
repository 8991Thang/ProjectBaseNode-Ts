import log from "@src/logger";
import dotenv from "dotenv-safe";
import express from "express";
import dependencies from "@src/config/dependencies";
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUiExpress from "swagger-ui-express";

import { routesConfig } from "./config/routes";
import dbConnect from "./db";
import errorHandler from "@src/middlewares/errorHandler.middleware";
import { swaggerConfig } from "@src/config/swaggerConfig";
dotenv.config();
const app = express();
const port = process.env.PORT || 8000;

dependencies(app);
routesConfig(app);
swaggerConfig(app);

app.use(errorHandler);

app.listen(port, async () => {
  log.info(`App running on port ${port}`);
  await dbConnect();
});
