import { createNewBookController, deleteBookController, likeBookController, getDetailNewBookController, getNewBookController, updateDetailNewBookController } from "@src/controllers/book.controller";
import { checkTokenMiddleware } from "@src/middlewares/checkToken.middleware";
import validateMiddleware from "@src/middlewares/validateRequest.middleware";
import { createBookSchema, updateBookSchema, pramsBookSchema } from "@src/schema/book.schema";
import { Router } from "express";

const bookRouter = Router();

bookRouter.use("/books", checkTokenMiddleware)
bookRouter.route("/books")
    .get(getNewBookController)
    .post(validateMiddleware(createBookSchema), createNewBookController)
bookRouter.use("/books/:id", validateMiddleware(pramsBookSchema))
bookRouter.route("/books/:id")
    .get(getDetailNewBookController)
    .delete(deleteBookController)
    .patch(validateMiddleware(updateBookSchema), updateDetailNewBookController)
    .put(likeBookController)

export default bookRouter