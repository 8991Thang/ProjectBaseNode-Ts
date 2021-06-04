import { StatusCodes } from "http-status-codes";
import { NextFunction, Request, Response } from "express";
import { AnySchema } from "yup";
import log from "@src/logger";

const validateMiddleware =
  (schema: AnySchema) => async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.validate({
        body: req.body,
        query: req.query,
        params: req.params,
      });
      return next();
    } catch (error) {
      log.error(error, "validate middleware");
      return res.status(StatusCodes.BAD_REQUEST).json({ error: error.message });
    }
  };
export default validateMiddleware;
