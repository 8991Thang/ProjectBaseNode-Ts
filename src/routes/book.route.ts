import { Router } from "express";
import {
  createNewBookController,
  deleteBookController,
  subscribeBookController,
  getDetailNewBookController,
  getTheBookController,
  updateDetailNewBookController,
  getTheBookOfAuthorController,
  unsubscribeBookController,
  listMemberSubscribeBookController,
} from "@src/controllers/book.controller";
import { checkTokenMiddleware } from "@src/middlewares/checkToken.middleware";
import validateMiddleware from "@src/middlewares/validateRequest.middleware";
import {
  createBookSchema,
  updateBookSchema,
  pramsBookSchema,
  queryBookSchema,
} from "@src/schema/book.schema";

const bookRouter = Router();

bookRouter.use("/books", checkTokenMiddleware);
bookRouter
  .route("/books")
  .get(validateMiddleware(queryBookSchema), getTheBookController)
  .post(validateMiddleware(createBookSchema), createNewBookController);

bookRouter.route("/books/author").get(getTheBookOfAuthorController);

bookRouter.use("/books/:id", validateMiddleware(pramsBookSchema));
bookRouter
  .route("/books/:id")
  .get(getDetailNewBookController)
  .delete(deleteBookController)
  .patch(validateMiddleware(updateBookSchema), updateDetailNewBookController);

bookRouter.route("/books/:id/subscribe").patch(subscribeBookController);

bookRouter.route("/books/:id/unsubscribe").patch(unsubscribeBookController);
bookRouter
  .route("/books/:id/list-member-subscribe")
  .get(validateMiddleware(queryBookSchema), listMemberSubscribeBookController);

export default bookRouter;
