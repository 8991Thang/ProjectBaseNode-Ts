import { Book } from "@src/models/book.model"
import { IBook } from "@src/types/book.type"
import ErrorHandler, { handleResponse } from "@src/utils/response.utils"
import { getReasonPhrase, StatusCodes } from "http-status-codes"

export const createBookService = async (_authorID: string, book: IBook) => {
    try {
        const newBook = await Book.create({ ...book, author: _authorID })
        return handleResponse(StatusCodes.CREATED, getReasonPhrase(StatusCodes.CREATED), newBook)
    } catch (error) {
        throw new ErrorHandler(500, error)
    }
}

export const getTheBookService = async (_authorID: string) => {
    try {
        const listOfTheBook = await Book.find({ author: _authorID })
        return handleResponse(StatusCodes.OK, getReasonPhrase(StatusCodes.OK), listOfTheBook)
    } catch (error) {
        throw new ErrorHandler(500, error)
    }
}
export const getDetailTheBookService = async (_authorID: string, idBook: string) => {
    try {
        const listOfTheBook = await Book.findOne({ author: _authorID, _id: idBook })
        return handleResponse(StatusCodes.OK, getReasonPhrase(StatusCodes.OK), listOfTheBook)
    } catch (error) {
        throw new ErrorHandler(500, error)
    }
}
export const updateDetailTheBookService = async (_authorID: string, idBook: string, dataBook: IBook) => {
    try {
        const listOfTheBook = await Book.findOneAndUpdate({ author: _authorID, _id: idBook }, dataBook, { new: true })
        return handleResponse(StatusCodes.OK, getReasonPhrase(StatusCodes.OK), listOfTheBook)
    } catch (error) {
        throw new ErrorHandler(500, error)
    }
}
export const deleteBookService = async (_authorID: string, idBook: string) => {
    try {
        await Book.findOneAndUpdate({ author: _authorID, _id: idBook })
        return handleResponse(StatusCodes.OK, "Deleted the book")
    } catch (error) {
        throw new ErrorHandler(500, error)
    }
}