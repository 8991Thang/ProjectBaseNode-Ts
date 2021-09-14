"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.queryHobbySchema = exports.createHobbySchema = void 0;
const hobby_type_1 = require("@src/types/hobby.type");
const yup_1 = require("yup");
const book_type_1 = require("@src/types/book.type");
exports.createHobbySchema = yup_1.object({
    body: yup_1.object({
        name: yup_1.string().required("Name of hobby is required"),
        typeOfHobby: yup_1.string().oneOf(hobby_type_1.listHobbyType, `typeOfHobby must be one of the following values: ${hobby_type_1.listHobbyType.join(" , ")}`)
            .required("Type of hobby is required.")
    })
});
exports.queryHobbySchema = yup_1.object({
    query: yup_1.object({
        limit: yup_1.number().typeError('Limit must be a number'),
        page: yup_1.number().typeError('Page must be a number'),
        sort: yup_1.string().oneOf(hobby_type_1.filedsSortHobby, `Sort must be one of the following values: ${hobby_type_1.filedsSortHobby.join(" , ")}`),
        typeOfBook: yup_1.string().oneOf(hobby_type_1.listHobbyType, `typeOfBook must be one of the following values: ${hobby_type_1.listHobbyType.join(" , ")}`),
        typeSort: yup_1.string().oneOf(book_type_1.typeSort, `Type of sort must be one of the following values: ${book_type_1.typeSort.join(" , ")}`),
    })
});
