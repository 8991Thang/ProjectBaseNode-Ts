import { Express } from "express";
import bookRouter from "@src/routes/book.route";
import hobbyRoute from "@src/routes/hobby.route";
import userRouter from "@src/routes/user.route";

export const routesConfig = (app: Express): void => {
  app.use("/api", [userRouter, bookRouter, hobbyRoute]);
};
