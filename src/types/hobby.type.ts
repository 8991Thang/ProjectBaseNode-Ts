export const listHobbyType = ["Action", "Hard-working", "Entertainment","Sport"]
export interface IOptionQueryHobby {
    limit: number,
    typeOfHobby: string,
    page: number,
    sort: string,
    typeSort: string,
}
export const fieldsSortHobby = ["typeOfHobby","name","createdAt"]