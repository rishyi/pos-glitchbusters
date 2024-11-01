export default class CustomerModel {
    constructor(id, name, email, tele) {
        this._id = id;
        this._name = name;
        this._email = email;
        this._tele = tele;
    }
    get id() {
        return this._id;
    }
    set id(value) {
        this._id = value;
    }

    get name() {
        return this._name;
    }
    set name(value) {
        this._name = value;
    }

    get email() {
        return this._email;
    }
    set email(value) {
        this._email = value;
    }

    get tele() {
        return this._tele;
    }
    set tele(value) {
        this._tele = value;
    }
}
