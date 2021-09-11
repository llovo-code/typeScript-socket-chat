"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
class User {
    constructor() {
        this.people = [];
        this.people = [];
    }
    addPerson(id, name, rooms) {
        let person = { id, name, rooms };
        this.people.push(person);
        return this.people;
    }
    getPersonById(id) {
        let person = this.people.filter(p => { return p.id === id; })[0];
        return person;
    }
    getPeople() {
        return this.people;
    }
    getPeopleByRooms(rooms) {
        let usersRooms = this.people.filter(p => {
            return p.rooms === rooms;
        });
        return usersRooms;
    }
    removePerson(id) {
        let person = this.getPersonById(id);
        this.people = this.people.filter(p => { return p.id != id; });
        return person;
    }
}
exports.User = User;
//# sourceMappingURL=users.js.map