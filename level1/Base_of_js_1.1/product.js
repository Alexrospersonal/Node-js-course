"use strict"

class Product {

    constructor(ID, name, description, price, brand, activeSize, quantity, date, images) {
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
    }

    // Getters and setters for class fields
    getID() {
        return this._ID;
    }

    setID(value) {
        this._ID = value;
    }

    getName() {
        return this._name;
    }

    setName(value) {
        this._name = value;
    }

    getDescription() {
        return this._description;
    }

    setDesctiption(value) {
        this._description = value;
    }

    getPrice() {
        return this._price;
    }

    setPrice(value) {
        this._price;
    }

    getBrand() {
        return this._brand;
    }

    setBrand(value) {
        this._brand;
    }

    getSizes() {
        return this._sizes;
    }

    setSizes(value) {
        this._sizes;
    }

    getActiveSize() {
        return this._activeSize;
    }

    setActiveSize(value) {
        this._activeSize;
    }

    getQuantity() {
        return this._quantity;
    }

    setQuantity(value) {
        this._quantity;
    }

    getDate() {
        return this._date;
    }

    setDate(value) {
        this._date;
    }

    getReviews() {
        return this._reviews;
    }

    setReviews(value) {
        this._reviews;
    }

    getImages() {
        return this._images;
    }

    setImages(value) {
        this._images;
    }

    /**
     * @description Gets the review instance from revies array by ID.
     * @param {string} ID 
     * @returns Review instance or null.
     */
    getReviewsByID(ID) {
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
    getImage(img = 1) {
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
    addSize(size) {
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
    deleteSize(size) {
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
    addReview(ID, author, date, comment, rating) {
        this._reviews.push(new Review(ID, author, date, comment, rating));
    }
    /**
     * @description Delete review from arrya by reviewID
     * @param {string} reviewID 
     */
    deleteReview(reviewID) {
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
    getAverageRating() {
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

class Review {
    constructor(ID, author, date, comment, rating) {
        this.ID = ID;
        this.author = author;
        this.date = date;
        this.comment = comment;
        this.rating = rating;
    }

    toString() {
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

pad.getReviews().forEach((val, idx, arr) => console.log(val.toString()));

console.log(pad.getAverageRating());

