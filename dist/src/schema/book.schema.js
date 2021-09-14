"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.queryBookSchema = exports.pramsBookSchema = exports.updateBookSchema = exports.createBookSchema = void 0;
const book_type_1 = require("@src/types/book.type");
const mongoose_1 = require("mongoose");
const yup_1 = require("yup");
exports.createBookSchema = yup_1.object({
    body: yup_1.object({
        name: yup_1.string()
            .required("Name of the book is required")
            .min(10, "Name of the book too short")
            .max(100, "Name of the book too long"),
        typeOfBook: yup_1.string().oneOf(book_type_1.BookTypes, `typeOfBook must be one of the following values: ${book_type_1.BookTypes.join(" , ")}`)
            .required("Type of the book is required"),
        author: yup_1.string()
            .max(100, "Author of the book too long"),
        description: yup_1.string()
            .required("Description of the book is required")
            .min(50, "Description of the book too short")
            .max(300, "Description of the book too long"),
    })
});
exports.updateBookSchema = yup_1.object({
    body: yup_1.object({
        name: yup_1.string()
            .min(10, "Name of the book too short")
            .max(100, "Name of the book too long"),
        typeOfBook: yup_1.string().oneOf(book_type_1.BookTypes, `typeOfBook must be one of the following values: ${book_type_1.BookTypes.join(" , ")}`),
        author: yup_1.string()
            .max(100, "Author of the book too long"),
        description: yup_1.string()
            .min(50, "Description of the book too short")
            .max(300, "Description of the book too long"),
    })
});
exports.pramsBookSchema = yup_1.object({
    params: yup_1.object({
        id: yup_1.mixed().test({
            message: "IdBook of the book must be a uuid",
            test: (value) => {
                return mongoose_1.isValidObjectId(value);
            },
        }).required("ID of the book is required")
    })
});
exports.queryBookSchema = yup_1.object({
    query: yup_1.object({
        limit: yup_1.number().typeError('Limit must be a number'),
        page: yup_1.number().typeError('Page must be a number'),
        sort: yup_1.string().oneOf(book_type_1.filedsSortBook, `Sort must be one of the following values: ${book_type_1.filedsSortBook.join(" , ")}`),
        typeOfBook: yup_1.string().oneOf(book_type_1.BookTypes, `typeOfBook must be one of the following values: ${book_type_1.BookTypes.join(" , ")}`),
        typeSort: yup_1.string().oneOf(book_type_1.typeSort, `Type of sort must be one of the following values: ${book_type_1.typeSort.join(" , ")}`),
    })
});
