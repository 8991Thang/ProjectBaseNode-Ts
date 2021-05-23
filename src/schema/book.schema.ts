import { BookTypes } from "@src/types/book.type";
import { object, string } from "yup";

export const createBookSchema = object({
    body: object({
        name: string()
            .required("Name of the book is required")
            .min(10, "Name of the book too short")
            .max(100, "Name of the book too long"),
        typeOfBook: string().oneOf(BookTypes,
            `typeOfBook must be one of the following values: ${BookTypes.join(" , ")}`)
            .required("Type of the book is required"),
        author: string()
            .max(100, "Author of the book too long"),
        description: string()
            .required("Description of the book is required")
            .min(50, "Description of the book too short")
            .max(300, "Description of the book too long"),
    })
})

export const updateBookSchema = object({
    body: object({
        name: string()
            .min(10, "Name of the book too short")
            .max(100, "Name of the book too long"),
        typeOfBook: string().oneOf(BookTypes,
            `typeOfBook must be one of the following values: ${BookTypes.join(" , ")}`),
        author: string()
            .max(100, "Author of the book too long"),
        description: string()
            .min(50, "Description of the book too short")
            .max(300, "Description of the book too long"),
    })
})

export const pramsBookSchema = object({
    params: object({
        id: string().uuid("IdBook of the book must be a uuid")
    })
})