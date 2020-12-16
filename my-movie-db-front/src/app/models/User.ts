export default class User {
    id: number;
    login: string;
    hash: string;
    name: string;
    surname: string;
    description: string;

    constructor(id: number, login: string, hash: string, name: string, surname: string, description: string) {
        this.id = id;
        this.login = login;
        this.hash = hash;
        this.name = name;
        this.surname = surname;
        this.description = description;
    }
}