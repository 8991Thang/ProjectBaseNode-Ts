"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Book = void 0;
const book_type_1 = require("@src/types/book.type");
const mongoose_1 = require("mongoose");
const mongoose_paginate_v2_1 = __importDefault(require("mongoose-paginate-v2"));
const BookSchema = new mongoose_1.Schema({
    author: { type: mongoose_1.Schema.Types.ObjectId, ref: "User" },
    description: { type: String, required: true },
    typeOfBook: { type: String, required: true, enum: book_type_1.BookTypes },
    subscribes: { type: [mongoose_1.Schema.Types.ObjectId], ref: "User" },
    name: { type: String, required: true },
}, { timestamps: true });
BookSchema.plugin(mongoose_paginate_v2_1.default);
exports.Book = mongoose_1.model("Book", BookSchema);
