"use strict"

function AbstractProduct(ID, name, description, price, quantity, images, date, brand) {
    if (this.constructor === AbstractProduct) {
        throw new Error("Cannot instantiate an abstract class.");
    }

    this._ID = ID;
    this._name = name;
    this._description = description;
    this._price = price;
    this._quantity = quantity;
    this._images = images;
    this._date = date;
    this._brand = brand;
    this._reviews = [];

    // Getters and setters for class fields
    this.getID = function () {
        return this._ID;
    }

    this.setID = function (value) {
        this._ID = value;
    }

    this.getName = function () {
        return this._defGetSetFunc("_name");
    }

    this.setName = function (value) {
        this._defGetSetFunc("_name", value);
    }

    this.getDescription = function () {
        return this._defGetSetFunc("_description");
    }

    this.setDesctiption = function (value) {
        this._defGetSetFunc("_description", value);
    }

    this.getPrice = function () {
        return this._defGetSetFunc("_price");
    }

    this.setPrice = function (value) {
        this._defGetSetFunc("_price", value);
    }

    this.getBrand = function () {
        return this._defGetSetFunc("_brand");

    }

    this.setBrand = function (value) {
        this._defGetSetFunc("_brand", value);
    }

    this.getQuantity = function () {
        return this._defGetSetFunc("_quantity");
    }

    this.setQuantity = function (value) {
        this._defGetSetFunc("_quantity", value);
    }

    this.getDate = function () {
        return this._defGetSetFunc("_date");
    }

    this.setDate = function (value) {
        this._defGetSetFunc("_date", value);
    }

    this.getReviews = function () {
        return this._defGetSetFunc("_reviews");

    }

    this.setReviews = function (value) {
        this._defGetSetFunc("_reviews", value);
    }

    this.getImages = function () {
        return this._defGetSetFunc("_images");

    }

    this.setImages = function (value) {
        this._defGetSetFunc("_images", value);
    }

    this._defGetSetFunc = function (param, value = null) {
        if (value === null) {
            return this[param];
        }
        this[param] = value;
    }
}

Object.assign(AbstractProduct.prototype, {
    getFullInformation() {
        let res = [];

        for (const [key, val] of Object.entries(this)) {
            if (typeof val !== "function") {
                res.push(`${key.slice(1)} : ${val}`);
            }
        }

        return res.join('\n');

    },
    getPriceForQuantity(int) {
        return `${this._price * int}`;
    }
})

// let absProd = new AbstractProduct("KFC325", "Galaxy Tab 10", "Mobile pad", 375.23, 100, ["img1.jpg"], new Date(), "Samsung");
// console.log(absProd.getFullInformation());
// console.log(absProd.getPriceForQuantity(10));


function Clothes(ID, name, description, price, quantity, images, date, brand, material, color) {
    AbstractProduct.call(this, ID, name, description, price, quantity, images, date, brand);
    this._material = material;
    this._color = color;

    this.getMaterial = function () {
        return this._material;
    };

    this.setMaterial = function (value) {
        this._material = value;
    };

    this.getColor = function () {
        return this._color;
    };

    this.setColor = function (value) {
        this._color = value;
    };
}

Clothes.prototype = Object.create(AbstractProduct.prototype);
Clothes.prototype.constructor = Clothes;

function Electronics(ID, name, description, price, quantity, images, date, brand, warranty, power) {
    AbstractProduct.call(this, ID, name, description, price, quantity, images, date, brand)
    this._warranty = warranty;
    this._power = power;

    this.getWarranty = function () {
        return this._warranty;
    };

    this.setWarranty = function (value) {
        this._warranty = value;
    };

    this.getPower = function () {
        return this._power;
    };

    this.setPower = function (value) {
        this._power = value;
    };
}

Electronics.prototype = Object.create(AbstractProduct.prototype);
Electronics.prototype.constructor = Electronics;

let tShirt = new Clothes("KFC325", "Big Wolf", "Cool modern T-Shirt", 19.25, 76, ["img"], new Date(), "cTc", "cotton", "blue");
console.log(tShirt.getName());
console.log(tShirt.setName = "Small animal");

console.log(tShirt.getFullInformation());
console.log(tShirt.getPriceForQuantity(10));

let electroinc = new Electronics("LIR235", "MiPad10", "The best pad", 220, 3, ["img"], new Date(), "Xiaomi", 2, 65);
console.log(electroinc.getFullInformation());
console.log(electroinc.getPriceForQuantity(10));