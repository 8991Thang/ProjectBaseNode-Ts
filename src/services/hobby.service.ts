/* eslint-disable no-useless-catch */
import { StatusCodes } from "http-status-codes";
import { getRepository } from "typeorm";
import { handleResponse } from "@src/utils/response.utils";
import { IOptionQueryHobby } from "@src/types/hobby.type";
import HobbyEntity from "../entity/Hobby";

export const createHobbyServices = async (_dataHobby: any) => {
  try {
    const hobby = getRepository(HobbyEntity).create(_dataHobby);
    const newHobby = await getRepository(HobbyEntity).save(hobby);
    return handleResponse(StatusCodes.CREATED, "Create hobby successfully!!", newHobby);
  } catch (error) {
    throw error;
  }
};
export const getHobbyServices = async (oftionQuery: IOptionQueryHobby) => {
  try {
    const hobby = await getRepository(HobbyEntity).findOne();
    return handleResponse(StatusCodes.OK, "Get hobby successfully!!", hobby);
  } catch (error) {
    throw error;
  }
};
