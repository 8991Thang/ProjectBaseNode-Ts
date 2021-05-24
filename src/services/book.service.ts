import { getReasonPhrase, StatusCodes } from "http-status-codes";
import { Book } from "@src/models/book.model";
import { IBook } from "@src/types/book.type";
import ErrorHandler, { handleResponse } from "@src/utils/response.utils";

export const createBookService = async (_authorID: string, book: IBook) => {
    try {
    const newBook = await Book.create({ ...book, author: _authorID })
    return handleResponse(StatusCodes.CREATED, getReasonPhrase(StatusCodes.CREATED), newBook)
    } catch (error) {
        throw new ErrorHandler(StatusCodes.INTERNAL_SERVER_ERROR, error)
    }
}

export const getTheBookService = async () => {
    try {
        const listOfTheBook = await Book.find()
        return handleResponse(StatusCodes.OK, getReasonPhrase(StatusCodes.OK), listOfTheBook)
    } catch (error) {
        throw new ErrorHandler(StatusCodes.INTERNAL_SERVER_ERROR, error)
    }
}
export const getTheBookOfAuthorService = async (_authorID: string) => {
    try {
        const listOfTheBook = await Book.find({ author: _authorID})
        return handleResponse(StatusCodes.OK, getReasonPhrase(StatusCodes.OK), listOfTheBook)
    } catch (error) {
        throw new ErrorHandler(StatusCodes.INTERNAL_SERVER_ERROR, error)
    }
}
export const getDetailTheBookService = async ( idBook: string) => {
    try {
        const listOfTheBook = await Book.findOne({ _id: idBook })
        if(!listOfTheBook) {
            throw new ErrorHandler(StatusCodes.INTERNAL_SERVER_ERROR, "The book does not exist!")
        }
        return handleResponse(StatusCodes.OK, getReasonPhrase(StatusCodes.OK), listOfTheBook)
    } catch (error) {
        throw error
    }
}
export const updateDetailTheBookService = async (_authorID: string, idBook: string, dataBook: IBook) => {
    try {
        const listOfTheBook = await Book.findOneAndUpdate({ author: _authorID, _id: idBook }, dataBook, { new: true })
        return handleResponse(StatusCodes.OK, getReasonPhrase(StatusCodes.OK), listOfTheBook)
    } catch (error) {
        throw new ErrorHandler(StatusCodes.INTERNAL_SERVER_ERROR, error)
    }
}
export const deleteBookService = async (_authorID: string, idBook: string) => {
    try {
        await Book.findOneAndDelete({ author: _authorID, _id: idBook })
        return handleResponse(StatusCodes.OK, "Deleted the book")
    } catch (error) {
        throw new ErrorHandler(StatusCodes.INTERNAL_SERVER_ERROR, error)
    }
}
export const subscribeBookService = async (_idOfMemberLike: string, idBook: string) => {
    try {
        const bookFound = await Book.findOne({_id: idBook }).lean();
        if(_idOfMemberLike === bookFound?.author.toString()){
            throw new ErrorHandler(StatusCodes.BAD_GATEWAY,"Authors can't subscribed of their own books")
        }
        if(!bookFound) {
            throw new ErrorHandler(StatusCodes.BAD_GATEWAY,"The book does not exist!")
        }
        const listIdMemberSubscribe = bookFound.subscribes.map(_id => _id.toString());
        if(listIdMemberSubscribe.includes(_idOfMemberLike)){
            throw new ErrorHandler(StatusCodes.BAD_GATEWAY,"The member subscribed this book!")
        }
        const newlistIdMemberSubscribe = listIdMemberSubscribe.concat(_idOfMemberLike)
        await Book.updateOne({_id: idBook },{ $set: {subscribes:newlistIdMemberSubscribe} })
        return handleResponse(StatusCodes.OK, "Subscribe successfully!")
    } catch (error) {
        throw error
    }
}
export const unsubscribeBookService = async (_idOfMemberUnLike: string, idBook: string) => {
    try {
        const bookFound = await Book.findOne({_id: idBook });
        if(!bookFound) {
            throw new ErrorHandler(StatusCodes.BAD_GATEWAY,"The book does not exist!")
        }
        const listIdMemberSubscribe = bookFound.subscribes.map(_id => _id.toString());
        if(!listIdMemberSubscribe.includes(_idOfMemberUnLike)){
            throw new ErrorHandler(StatusCodes.BAD_GATEWAY,"The member has not subscribed this book!")
        }
        const newListIdMemberUnlike = listIdMemberSubscribe.filter(id => id !== _idOfMemberUnLike)
        await Book.updateOne({_id: idBook },{ $set: {subscribes:newListIdMemberUnlike}})
        return handleResponse(StatusCodes.OK, "Unsubscribe successfully!")
    } catch (error) {
        throw error
    }
}
export const listMemberSubscribeBookService = async (idBook: string) => {
    try {
        const bookFound = await Book.findOne({_id: idBook }).populate('subscribes', "-password -__v -createdAt -updatedAt");
        if(!bookFound) {
            throw new ErrorHandler(StatusCodes.BAD_GATEWAY,"The book does not exist!")
        }
        return handleResponse(StatusCodes.OK, "Get list of member liked successfully!",bookFound)
    } catch (error) {
        throw error
    }
}