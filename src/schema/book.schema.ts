import { isValidObjectId } from "mongoose";
import { mixed, number, object, string } from "yup";
import { BookTypes, fieldsSortBook, typeSort } from "@src/types/book.type";

export const createBookSchema = object({
  body: object({
    name: string()
      .required("Name of the book is required")
      .min(10, "Name of the book too short")
      .max(100, "Name of the book too long"),
    typeOfBook: string()
      .oneOf(BookTypes, `typeOfBook must be one of the following values: ${BookTypes.join(" , ")}`)
      .required("Type of the book is required"),
    author: string().max(100, "Author of the book too long"),
    description: string()
      .required("Description of the book is required")
      .min(50, "Description of the book too short")
      .max(300, "Description of the book too long"),
  }),
});

export const updateBookSchema = object({
  body: object({
    name: string().min(10, "Name of the book too short").max(100, "Name of the book too long"),
    typeOfBook: string().oneOf(
      BookTypes,
      `typeOfBook must be one of the following values: ${BookTypes.join(" , ")}`,
    ),
    author: string().max(100, "Author of the book too long"),
    description: string()
      .min(50, "Description of the book too short")
      .max(300, "Description of the book too long"),
  }),
});

export const pramsBookSchema = object({
  params: object({
    id: mixed()
      .test({
        message: "IdBook of the book must be a uuid",
        test: (value) => {
          return isValidObjectId(value);
        },
      })
      .required("ID of the book is required"),
  }),
});
export const queryBookSchema = object({
  query: object({
    limit: number().typeError("Limit must be a number"),
    page: number().typeError("Page must be a number"),
    sort: string().oneOf(
      fieldsSortBook,
      `Sort must be one of the following values: ${fieldsSortBook.join(" , ")}`,
    ),
    typeOfBook: string().oneOf(
      BookTypes,
      `typeOfBook must be one of the following values: ${BookTypes.join(" , ")}`,
    ),
    typeSort: string().oneOf(
      typeSort,
      `Type of sort must be one of the following values: ${typeSort.join(" , ")}`,
    ),
  }),
});
