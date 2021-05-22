import { StatusCodes } from 'http-status-codes';
import log from '@src/logger';
import User, { UserDocument } from "@src/models/user.model"
import { DocumentDefinition } from "mongoose"
import _ from 'lodash';

export const createUser = async (_user: DocumentDefinition<UserDocument>) => {
    try {
        const user = await User.create(_user)
        return _.omit(user.toJSON(), "password");
    } catch (error) {
        throw new Error(error)
    }
}

export const loginUser = async (_user: DocumentDefinition<UserDocument>) => {
    try {
        const user = await User.create(_user)
        log.info(user, `User created`)
        return user;
    } catch (error) {
        throw new Error(error)
    }
}

