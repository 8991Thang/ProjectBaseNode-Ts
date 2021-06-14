/* eslint-disable no-shadow */
export const listHobbyType = ["Action", "Technology", "Entertainment", "Sport"];

export enum HobbyType {
  ACTION = "Action",
  TECHNOLOGY = "Technology",
  ENTERTAINMENT = "Entertainment",
  SPORT = "Sport",
}

export interface IOptionQueryHobby {
  limit: number;
  typeOfHobby: string;
  page: number;
  sort: string;
  typeSort: string;
}
export const fieldsSortHobby = ["typeOfHobby", "name", "createdAt"];
