export interface IBook {
    description: string,
    typeOfBook: string,
    author: string,
    name: string,
}
export interface IOptionQueryBook {
    limit: number,
    typeOfBook: string,
    page: number,
    sort: string,
    typeSort: string,
}
export interface IBookType {
    type: string
}
export interface IFilterBook {
    typeOfBook: string,
}


export const BookTypes = ["Classics", "Cartoon", "Romantic", "Fantasy", "Horror", "Fairytale"];

export const fieldsSortBook = ["typeOfBook","name","description","createdAt"]

export const typeSort = ["asc","desc"]