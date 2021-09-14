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
Object.defineProperty(exports, "__esModule", { value: true });
exports.listMemberSubscribeBookController = exports.unsubscribeBookController = exports.subscribeBookController = exports.deleteBookController = exports.updateDetailNewBookController = exports.getDetailNewBookController = exports.getTheBookOfAuthorController = exports.getTheBookController = exports.createNewBookController = void 0;
const book_service_1 = require("@src/services/book.service");
const http_status_codes_1 = require("http-status-codes");
const createNewBookController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { _id } = res.locals.userData;
        const newBook = yield book_service_1.createBookService(_id, req.body);
        return res.status(http_status_codes_1.StatusCodes.CREATED).json(newBook);
    }
    catch (err) {
        res.status(err === null || err === void 0 ? void 0 : err.status).json(err);
    }
});
exports.createNewBookController = createNewBookController;
const getTheBookController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const query = req.query;
        const listOfBook = yield book_service_1.getTheBookService(query);
        return res.status(http_status_codes_1.StatusCodes.OK).json(listOfBook);
    }
    catch (err) {
        res.status(err === null || err === void 0 ? void 0 : err.status).json(err);
    }
});
exports.getTheBookController = getTheBookController;
const getTheBookOfAuthorController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { _id } = res.locals.userData;
        const listOfBook = yield book_service_1.getTheBookOfAuthorService(_id);
        return res.status(http_status_codes_1.StatusCodes.OK).json(listOfBook);
    }
    catch (err) {
        res.status(err === null || err === void 0 ? void 0 : err.status).json(err);
    }
});
exports.getTheBookOfAuthorController = getTheBookOfAuthorController;
const getDetailNewBookController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const listOfBook = yield book_service_1.getDetailTheBookService(req.params.id);
        return res.status(http_status_codes_1.StatusCodes.OK).json(listOfBook);
    }
    catch (err) {
        return next(err);
    }
});
exports.getDetailNewBookController = getDetailNewBookController;
const updateDetailNewBookController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { _id } = res.locals.userData;
        const listOfBook = yield book_service_1.updateDetailTheBookService(_id, req.params.id, req.body);
        return res.status(http_status_codes_1.StatusCodes.OK).json(listOfBook);
    }
    catch (err) {
        return next(err);
    }
});
exports.updateDetailNewBookController = updateDetailNewBookController;
const deleteBookController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { _id } = res.locals.userData;
        const listOfBook = yield book_service_1.deleteBookService(_id, req.params.id);
        return res.status(http_status_codes_1.StatusCodes.OK).json(listOfBook);
    }
    catch (err) {
        return next(err);
    }
});
exports.deleteBookController = deleteBookController;
const subscribeBookController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { _id } = res.locals.userData;
        const listOfBook = yield book_service_1.subscribeBookService(_id, req.params.id);
        return res.status(http_status_codes_1.StatusCodes.OK).json(listOfBook);
    }
    catch (err) {
        return next(err);
    }
});
exports.subscribeBookController = subscribeBookController;
const unsubscribeBookController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { _id } = res.locals.userData;
        const listOfBook = yield book_service_1.unsubscribeBookService(_id, req.params.id);
        return res.status(http_status_codes_1.StatusCodes.OK).json(listOfBook);
    }
    catch (err) {
        return next(err);
    }
});
exports.unsubscribeBookController = unsubscribeBookController;
const listMemberSubscribeBookController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const query = req.query;
        const listOfBook = yield book_service_1.listMemberSubscribeBookService(req.params.id, query);
        return res.status(http_status_codes_1.StatusCodes.OK).json(listOfBook);
    }
    catch (err) {
        return next(err);
    }
});
exports.listMemberSubscribeBookController = listMemberSubscribeBookController;
