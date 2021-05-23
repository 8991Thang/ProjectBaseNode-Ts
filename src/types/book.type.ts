export interface IBook {
    description: string,
    typeOfBook: string,
    author: string,
    name: string,
}

export interface IBookType {
    type: string
}

export const BookTypes = ["Classics", "Cartoon", "Romatic", "Fantasy", "Horror", "Fairytale"]