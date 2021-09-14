import Hobby from "@src/models/hobby.model"
import { DocumentDefinition } from "mongoose"
import { HobbyDocument } from '@src/models/hobby.model';
import { handleResponse } from "@src/utils/response.utils";
import { StatusCodes } from "http-status-codes";
import { IOftionQueryHobby } from "@src/types/hobby.type";

export const createHobbyServices = async (_dataHobby:DocumentDefinition<HobbyDocument>) => {
    try {
        await Hobby.create(_dataHobby);
        return handleResponse(StatusCodes.CREATED,"Create hobby successfully!!")
    } catch (error) {
        throw error
    }
}
export const getHobbyServices = async (oftionQuery:IOftionQueryHobby) => {
    try {
        const typeOfHobby = {
            typeOfHobby : oftionQuery.typeOfHobby
        }
        const sortType = oftionQuery.typeSort === "asc" ? 1 : -1
        const options = {
            ...oftionQuery,
      sort: { [oftionQuery.sort]: sortType },
        }
       const hobbyList = await Hobby.paginate(oftionQuery.typeOfHobby ? typeOfHobby : {},options);
        return handleResponse(StatusCodes.OK,"Get hobby successfully!!",hobbyList)
    } catch (error) {
        throw error
    }
}