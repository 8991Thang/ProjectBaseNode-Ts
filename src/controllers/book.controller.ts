import { createBookService, deleteBookService, getDetailTheBookService, getTheBookService, updateDetailTheBookService } from "@src/services/book.service";
import ErrorHandler from '@src/utils/response.utils';
import { Request, Response } from "express";
import { StatusCodes } from 'http-status-codes';

export const createNewBookController = async (req: Request, res: Response) => {
    try {
        const { _id } = res.locals.userData
        const newBook = await createBookService(_id, req.body)
        return res.status(StatusCodes.CREATED).json(newBook)
    } catch (err) {
        throw new ErrorHandler(500, err)
    }
}

export const getNewBookController = async (req: Request, res: Response) => {
    try {
        const { _id } = res.locals.userData
        const listOfBook = await getTheBookService(_id)
        return res.status(StatusCodes.CREATED).json(listOfBook)
    } catch (err) {
        throw new ErrorHandler(500, err)
    }
}
export const getDetailNewBookController = async (req: Request, res: Response) => {
    try {
        const { _id } = res.locals.userData
        const listOfBook = await getDetailTheBookService(_id, req.params.id)
        return res.status(StatusCodes.CREATED).json(listOfBook)
    } catch (err) {
        throw new ErrorHandler(500, err)
    }
}

export const updateDetailNewBookController = async (req: Request, res: Response) => {
    try {
        const { _id } = res.locals.userData
        const listOfBook = await updateDetailTheBookService(_id, req.params.id, req.body)
        return res.status(StatusCodes.OK).json(listOfBook)
    } catch (err) {
        throw new ErrorHandler(500, err)
    }
}

export const deleteBookController = async (req: Request, res: Response) => {
    try {
        const { _id } = res.locals.userData
        const listOfBook = await deleteBookService(_id, req.params.id)
        return res.status(StatusCodes.OK).json(listOfBook)
    } catch (err) {
        throw new ErrorHandler(500, err)
    }
}

export const likeBookController = async (req: Request, res: Response) => {
    try {
        const { _id } = res.locals.userData
        const listOfBook = await deleteBookService(_id, req.params.id)
        return res.status(StatusCodes.OK).json(listOfBook)
    } catch (err) {
        throw new ErrorHandler(500, err)
    }
}