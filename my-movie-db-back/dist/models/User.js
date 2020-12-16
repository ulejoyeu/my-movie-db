"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class User {
    constructor(id, login, hash, name, surname, description) {
        this.id = id;
        this.login = login;
        this.hash = hash;
        this.name = name;
        this.surname = surname;
        this.description = description;
    }
}
exports.default = User;
