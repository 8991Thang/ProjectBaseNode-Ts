import { number, object, string } from "yup";
import { listHobbyType, fieldsSortHobby } from "@src/types/hobby.type";
import { typeSort } from "@src/types/book.type";

export const createHobbySchema = object({
  body: object({
    name: string().required("Name of hobby is required"),
    typeOfHobby: string()
      .oneOf(
        listHobbyType,
        `typeOfHobby must be one of the following values: ${listHobbyType.join(" , ")}`,
      )
      .required("Type of hobby is required."),
  }),
});

export const queryHobbySchema = object({
  query: object({
    limit: number().typeError("Limit must be a number"),
    page: number().typeError("Page must be a number"),
    sort: string().oneOf(
      fieldsSortHobby,
      `Sort must be one of the following values: ${fieldsSortHobby.join(" , ")}`,
    ),
    typeOfBook: string().oneOf(
      listHobbyType,
      `typeOfBook must be one of the following values: ${listHobbyType.join(" , ")}`,
    ),
    typeSort: string().oneOf(
      typeSort,
      `Type of sort must be one of the following values: ${typeSort.join(" , ")}`,
    ),
  }),
});
