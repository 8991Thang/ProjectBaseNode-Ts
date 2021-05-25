export const listHobbyType = ["Action", "Hard-working", "Entertainment","Sport"]
export interface IOftionQueryHobby {
    limit: number,
    typeOfHobby: string,
    page: number,
    sort: string,
    typeSort: string,
}
export const filedsSortHobby = ["typeOfHobby","name","createdAt"]