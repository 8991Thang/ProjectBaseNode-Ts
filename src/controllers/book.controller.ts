import { createBookService, deleteBookService, getDetailTheBookService, 
    getTheBookOfAuthorService, getTheBookService, subscribeBookService, 
    updateDetailTheBookService , unsubscribeBookService, listMemberSubscribeBookService} from "@src/services/book.service";
import { IOftionQueryBook } from "@src/types/book.type";
import { NextFunction, Request, Response } from "express";
import { StatusCodes } from 'http-status-codes';

export const createNewBookController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { _id } = res.locals.userData
        const newBook = await createBookService(_id, req.body)
        return res.status(StatusCodes.CREATED).json(newBook)
    } catch (err) {
        res.status(err?.status).json(err)
    }
}

export const getTheBookController = async (req: Request, res: Response) => {
    try {
        const query = req.query as unknown as IOftionQueryBook
        const listOfBook = await getTheBookService(query)
        return res.status(StatusCodes.OK).json(listOfBook)
    } catch (err) {
        res.status(err?.status).json(err)
    }
}
export const getTheBookOfAuthorController = async (req: Request, res: Response) => {
    try {
        const { _id } = res.locals.userData
        const listOfBook = await getTheBookOfAuthorService(_id)
        return res.status(StatusCodes.OK).json(listOfBook)
    } catch (err) {
        res.status(err?.status).json(err)
    }
}
export const getDetailNewBookController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const listOfBook = await getDetailTheBookService(req.params.id)
        return res.status(StatusCodes.OK).json(listOfBook)
    } catch (err) {
        return next(err)
    }
}

export const updateDetailNewBookController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { _id } = res.locals.userData
        const listOfBook = await updateDetailTheBookService(_id, req.params.id, req.body)
        return res.status(StatusCodes.OK).json(listOfBook)
    } catch (err) {
        return next(err)
    }
}

export const deleteBookController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { _id } = res.locals.userData
        const listOfBook = await deleteBookService(_id, req.params.id)
        return res.status(StatusCodes.OK).json(listOfBook)
    } catch (err) {
        return next(err)
    }
}

export const subscribeBookController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { _id } = res.locals.userData
        const listOfBook = await subscribeBookService(_id, req.params.id)
        return res.status(StatusCodes.OK).json(listOfBook)
    } catch (err) {
        return next(err)
    }
}

export const unsubscribeBookController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { _id } = res.locals.userData
        const listOfBook = await unsubscribeBookService(_id, req.params.id)
        return res.status(StatusCodes.OK).json(listOfBook)
    } catch (err) {
        return next(err)
    }
}
export const listMemberSubscribeBookController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const query = req.query as unknown as IOftionQueryBook
        const listOfBook = await listMemberSubscribeBookService(req.params.id, query)
        return res.status(StatusCodes.OK).json(listOfBook)
    } catch (err) {
        return next(err)
    }
}
