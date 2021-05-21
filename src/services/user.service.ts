import { StatusCodes } from 'http-status-codes';
import log from '@src/logger';
import User, { UserDocument } from "@src/models/user.model"
import { DocumentDefinition } from "mongoose"

export const createUser = async (_user: DocumentDefinition<UserDocument>) => {
    try {
        const { password, ...user } = await User.create(_user)
        return user
    } catch (error) {
        throw new Error(error)
    }
}

