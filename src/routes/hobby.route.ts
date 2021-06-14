import { Router } from "express";
import { checkTokenMiddleware } from "@src/middlewares/checkToken.middleware";
import validateMiddleware from "@src/middlewares/validateRequest.middleware";
import createHobbyController, { getHobbyController } from "@src/controllers/hobby.controller";
import { createHobbySchema, queryHobbySchema } from "@src/schema/hobby.schema";

const hobbyRoute = Router();

hobbyRoute.use("/hobby", checkTokenMiddleware);

hobbyRoute
  .route("/hobby")
  .post(validateMiddleware(createHobbySchema), createHobbyController)
  .get(validateMiddleware(queryHobbySchema), getHobbyController);
export default hobbyRoute;
