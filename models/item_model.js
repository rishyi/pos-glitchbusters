export default class ItemModel {
    constructor(id, name, category, price, stock) {
        this._id = id;
        this._name = name;
        this._category = category;
        this._price = price;
        this._stock = stock;
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

    get category() {
        return this._category;
    }
    set category(value) {
        this._category = value;
    }

    get price() {
        return this._price;
    }
    set price(value) {
        this._price = value;
    }

    get stock() {
        return this._stock;
    }
    set stock(value) {
        this._stock = value;
    }
}
