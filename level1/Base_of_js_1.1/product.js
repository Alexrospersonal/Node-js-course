"use strict"

function Product(ID, name, description, price, brand, activeSize, quantity, date, images) {

    this._ID = ID;
    this._name = name;
    this._description = description;
    this._price = price;
    this._brand = brand;
    this._sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];
    this._activeSize = activeSize;
    this._quantity = quantity;
    this._date = date;
    this._images = images;
    this._reviews = [];

    // Getters and setters for class fields
    this.getID = function () {
        return this._ID;
    }

    this.setID = function (value) {
        this._ID = value;
    }

    this.getName = function () {
        return this._name;
    }

    this.setName = function (value) {
        this._name = value;
    }

    this.getDescription = function () {
        return this._description;
    }

    this.setDesctiption = function (value) {
        this._description = value;
    }

    this.getPrice = function () {
        return this._price;
    }

    this.setPrice = function (value) {
        this._price;
    }

    this.getBrand = function () {
        return this._brand;
    }

    this.setBrand = function (value) {
        this._brand;
    }

    this.getSizes = function () {
        return this._sizes;
    }

    this.setSizes = function (value) {
        this._sizes;
    }

    this.getActiveSize = function () {
        return this._activeSize;
    }

    this.setActiveSize = function (value) {
        this._activeSize;
    }

    this.getQuantity = function () {
        return this._quantity;
    }

    this.setQuantity = function (value) {
        this._quantity;
    }

    this.getDate = function () {
        return this._date;
    }

    this.setDate = function (value) {
        this._date;
    }

    this.getReviews = function () {
        return this._reviews;
    }

    this.setReviews = function (value) {
        this._reviews;
    }

    this.getImages = function () {
        return this._images;
    }

    this.setImages = function (value) {
        this._images;
    }

    /**
     * @description Gets the review instance from revies array by ID.
     * @param {string} ID 
     * @returns Review instance or null.
     */
    this.getReviewsByID = function (ID) {
        this._reviews.forEach((review, idx, arr) => {
            if (review.ID === ID)
                return review;
        });
        return null;
    }

    /**
     * @description Return image from images array by image.
     * @param {string} img 
     * @returns first img if param is default or img by param if param is name of img.
     */
    this.getImage = function (img = 1) {
        this._images.forEach((img, idx, arr) => {
            if (img === img)
                return img;
        });
        return this._images[0];
    }
    /**
     * @description Add a new size for the array with sizes.
     * Throw the error if size isn't a string type. 
     * @param {string} size 
     */
    this.addSize = function (size) {
        if (typeof size === 'string')
            this._sizes.push(size);
        else
            throw new Error('Size must be a string');
    }
    /**
     * @description Delete a size from array if size is included in array.
     * Throw the error if size isn't a string type. 
     * @param {string} size 
     */
    this.deleteSize = function (size) {
        if (typeof size === 'string') {
            let idx = this._sizes.indexOf(size);
            if (idx !== -1) {
                this._sizes.splice(idx, 1);
            }
        }
        else
            throw new Error('Size must be a string');
    }
    /**
     * @description Add to views array a new Review instance.
     * @param {string} ID 
     * @param {string} author 
     * @param {date} date 
     * @param {string} comment 
     * @param {object} rating - Associate Array - rating['key']=value; 
        key one of 'service', 'price', 'value', 'quality'
     */
    this.addReview = function (ID, author, date, comment, rating) {
        this._reviews.push(new Review(ID, author, date, comment, rating));
    }
    /**
     * @description Delete review from arrya by reviewID
     * @param {string} reviewID 
     */
    this.deleteReview = function (reviewID) {
        this._reviews.forEach((review, idx, array) => {
            if (review.ID === reviewID) {
                this._reviews.splice(idx, 1);
            }
        })
    }
    /**
     * @description Get average value of of product
     * @returns average value
     */
    this.getAverageRating = function () {
        let result = 0;
        let count = 0;
        this._reviews.forEach((review, idx, arr) => {

            for (let [key, value] of Object.entries(review.rating)) {
                result += value;
                count++;
            }
        });

        return result / count;
    }

}

function Review(ID, author, date, comment, rating) {
    this.ID = ID;
    this.author = author;
    this.date = date;
    this.comment = comment;
    this.rating = rating;

    this.toString = function () {
        return `${this.ID} ${this.author} ${this.comment} ${this.rating}`;
    }
}

let pad = new Product(
    "1232355",
    "Galaxy Tab 10",
    "Mobile pad",
    375.23,
    "Samsung",
    "L",
    100,
    new Date(),
    ["img1.jpg"]
);

pad.addReview('AS23ID', 'Alex', new Date(), 'nice pad', { 'service': 4.2, 'price': 2.3, 'value': 3.2, 'quality': 4.3 });
pad.addReview('DK42OP', 'Tanya', new Date(), 'bad pad', { 'service': 4.2, 'price': 2.3, 'value': 3.2, 'quality': 4.3 });

pad.getReviews().forEach((val, idx, arr) => console.log(val));

console.log(pad.getAverageRating());

