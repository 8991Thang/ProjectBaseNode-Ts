"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const book_controller_1 = require("@src/controllers/book.controller");
const checkToken_middleware_1 = require("@src/middlewares/checkToken.middleware");
const validateRequest_middleware_1 = __importDefault(require("@src/middlewares/validateRequest.middleware"));
const book_schema_1 = require("@src/schema/book.schema");
const express_1 = require("express");
const book_controller_2 = require("./../controllers/book.controller");
const bookRouter = express_1.Router();
bookRouter.use("/books", checkToken_middleware_1.checkTokenMiddleware);
bookRouter
    .route("/books")
    .get(validateRequest_middleware_1.default(book_schema_1.queryBookSchema), book_controller_1.getTheBookController)
    .post(validateRequest_middleware_1.default(book_schema_1.createBookSchema), book_controller_1.createNewBookController);
bookRouter.route("/books/author").get(book_controller_1.getTheBookOfAuthorController);
bookRouter.use("/books/:id", validateRequest_middleware_1.default(book_schema_1.pramsBookSchema));
bookRouter
    .route("/books/:id")
    .get(book_controller_1.getDetailNewBookController)
    .delete(book_controller_1.deleteBookController)
    .patch(validateRequest_middleware_1.default(book_schema_1.updateBookSchema), book_controller_1.updateDetailNewBookController);
bookRouter.route("/books/:id/subscribe").patch(book_controller_1.subscribeBookController);
bookRouter.route("/books/:id/unsubscribe").patch(book_controller_1.unsubscribeBookController);
bookRouter
    .route("/books/:id/list-member-subscribe")
    .get(validateRequest_middleware_1.default(book_schema_1.queryBookSchema), book_controller_2.listMemberSubscribeBookController);
exports.default = bookRouter;
