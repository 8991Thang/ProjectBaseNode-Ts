export interface IBook {
    description: string,
    typeOfBook: string,
    author: string,
    name: string,
}
export interface IOftionQueryBook {
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


export const BookTypes = ["Classics", "Cartoon", "Romatic", "Fantasy", "Horror", "Fairytale"];

export const filedsSortBook = ["typeOfBook","name","description","createdAt"]

export const typeSort = ["asc","desc"]