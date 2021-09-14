"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.listMemberSubscribeBookService = exports.unsubscribeBookService = exports.subscribeBookService = exports.deleteBookService = exports.updateDetailTheBookService = exports.getDetailTheBookService = exports.getTheBookOfAuthorService = exports.getTheBookService = exports.createBookService = void 0;
const http_status_codes_1 = require("http-status-codes");
const book_model_1 = require("@src/models/book.model");
const response_utils_1 = __importStar(require("@src/utils/response.utils"));
const createBookService = (_authorID, book) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newBook = yield book_model_1.Book.create(Object.assign(Object.assign({}, book), { author: _authorID }));
        return response_utils_1.handleResponse(http_status_codes_1.StatusCodes.CREATED, http_status_codes_1.getReasonPhrase(http_status_codes_1.StatusCodes.CREATED), newBook);
    }
    catch (error) {
        throw new response_utils_1.default(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR, error);
    }
});
exports.createBookService = createBookService;
const getTheBookService = (optionQuery) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const typeOfTheBook = {
            typeOfBook: optionQuery.typeOfBook,
        };
        const sortType = optionQuery.typeSort === "asc" ? 1 : -1;
        const options = Object.assign(Object.assign({}, optionQuery), { sort: { [optionQuery.sort]: sortType }, populate: { path: "author", select: "-password -__v -updatedAt -createdAt" } });
        const listOfTheBook = yield book_model_1.Book.paginate(optionQuery.typeOfBook ? typeOfTheBook : {}, options);
        return response_utils_1.handleResponse(http_status_codes_1.StatusCodes.OK, http_status_codes_1.getReasonPhrase(http_status_codes_1.StatusCodes.OK), listOfTheBook);
    }
    catch (error) {
        throw new response_utils_1.default(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR, error);
    }
});
exports.getTheBookService = getTheBookService;
const getTheBookOfAuthorService = (_authorID) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const listOfTheBook = yield book_model_1.Book.find({ author: _authorID });
        return response_utils_1.handleResponse(http_status_codes_1.StatusCodes.OK, http_status_codes_1.getReasonPhrase(http_status_codes_1.StatusCodes.OK), listOfTheBook);
    }
    catch (error) {
        throw new response_utils_1.default(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR, error);
    }
});
exports.getTheBookOfAuthorService = getTheBookOfAuthorService;
const getDetailTheBookService = (idBook) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const listOfTheBook = yield book_model_1.Book.findOne({ _id: idBook });
        if (!listOfTheBook) {
            throw new response_utils_1.default(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR, "The book does not exist!");
        }
        return response_utils_1.handleResponse(http_status_codes_1.StatusCodes.OK, http_status_codes_1.getReasonPhrase(http_status_codes_1.StatusCodes.OK), listOfTheBook);
    }
    catch (error) {
        throw error;
    }
});
exports.getDetailTheBookService = getDetailTheBookService;
const updateDetailTheBookService = (_authorID, idBook, dataBook) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const listOfTheBook = yield book_model_1.Book.findOneAndUpdate({ author: _authorID, _id: idBook }, dataBook, { new: true });
        return response_utils_1.handleResponse(http_status_codes_1.StatusCodes.OK, http_status_codes_1.getReasonPhrase(http_status_codes_1.StatusCodes.OK), listOfTheBook);
    }
    catch (error) {
        throw new response_utils_1.default(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR, error);
    }
});
exports.updateDetailTheBookService = updateDetailTheBookService;
const deleteBookService = (_authorID, idBook) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield book_model_1.Book.findOneAndDelete({ author: _authorID, _id: idBook });
        return response_utils_1.handleResponse(http_status_codes_1.StatusCodes.OK, "Deleted the book");
    }
    catch (error) {
        throw new response_utils_1.default(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR, error);
    }
});
exports.deleteBookService = deleteBookService;
const subscribeBookService = (_idOfMemberLike, idBook) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const bookFound = yield book_model_1.Book.findOne({ _id: idBook }).lean();
        if (_idOfMemberLike === (bookFound === null || bookFound === void 0 ? void 0 : bookFound.author.toString())) {
            throw new response_utils_1.default(http_status_codes_1.StatusCodes.BAD_GATEWAY, "Authors can't subscribed of their own books");
        }
        if (!bookFound) {
            throw new response_utils_1.default(http_status_codes_1.StatusCodes.BAD_GATEWAY, "The book does not exist!");
        }
        const listIdMemberSubscribe = bookFound.subscribes.map(_id => _id.toString());
        if (listIdMemberSubscribe.includes(_idOfMemberLike)) {
            throw new response_utils_1.default(http_status_codes_1.StatusCodes.BAD_GATEWAY, "The member subscribed this book!");
        }
        const newlistIdMemberSubscribe = listIdMemberSubscribe.concat(_idOfMemberLike);
        yield book_model_1.Book.updateOne({ _id: idBook }, { $set: { subscribes: newlistIdMemberSubscribe } });
        return response_utils_1.handleResponse(http_status_codes_1.StatusCodes.OK, "Subscribe successfully!");
    }
    catch (error) {
        throw error;
    }
});
exports.subscribeBookService = subscribeBookService;
const unsubscribeBookService = (_idOfMemberUnLike, idBook) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const bookFound = yield book_model_1.Book.findOne({ _id: idBook });
        if (!bookFound) {
            throw new response_utils_1.default(http_status_codes_1.StatusCodes.BAD_GATEWAY, "The book does not exist!");
        }
        const listIdMemberSubscribe = bookFound.subscribes.map(_id => _id.toString());
        if (!listIdMemberSubscribe.includes(_idOfMemberUnLike)) {
            throw new response_utils_1.default(http_status_codes_1.StatusCodes.BAD_GATEWAY, "The member has not subscribed this book!");
        }
        const newListIdMemberUnlike = listIdMemberSubscribe.filter(id => id !== _idOfMemberUnLike);
        yield book_model_1.Book.updateOne({ _id: idBook }, { $set: { subscribes: newListIdMemberUnlike } });
        return response_utils_1.handleResponse(http_status_codes_1.StatusCodes.OK, "Unsubscribe successfully!");
    }
    catch (error) {
        throw error;
    }
});
exports.unsubscribeBookService = unsubscribeBookService;
const listMemberSubscribeBookService = (idBook, optionQuery) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const queryFilter = {
            typeOfBook: optionQuery.typeOfBook,
        };
        const sortType = optionQuery.typeSort === "asc" ? 1 : -1;
        const options = Object.assign(Object.assign({}, optionQuery), { sort: { [optionQuery.sort]: sortType }, select: "subscribes", populate: { path: "subscribes", select: "-password -__v -updatedAt -createdAt" } });
        const listOfTheBook = yield book_model_1.Book.paginate(optionQuery.typeOfBook ? queryFilter : { _id: idBook }, options);
        return response_utils_1.handleResponse(http_status_codes_1.StatusCodes.OK, "Get list of member liked successfully!", listOfTheBook);
    }
    catch (error) {
        throw error;
    }
});
exports.listMemberSubscribeBookService = listMemberSubscribeBookService;
