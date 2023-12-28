"use strict"

/**
 * Create Product object.
 * @param {string} ID 
 * @param {string} name 
 * @param {string} description 
 * @param {number} price 
 * @param {string} brand 
 * @param {string} activeSize 
 * @param {number} quantity 
 * @param {Date} date 
 * @param {array} images - with string name of image 
 */
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
            if (review.getID() === reviewID) {
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
        this.getReviews().forEach((review, idx, arr) => {

            for (let [key, value] of Object.entries(review.getRating())) {
                result += value;
                count++;
            }
        });

        return result / count;
    }

}

/**
 * Review container for products.
 * @param {string} ID 
 * @param {string} author 
 * @param {Date} date 
 * @param {string} comment 
 * @param {Associate Array} rating - rating['key']=value; 
        key one of 'service', 'price', 'value', 'quality'
 */
function Review(ID, author, date, comment, rating) {
    this._ID = ID;
    this._author = author;
    this._date = date;
    this._comment = comment;
    this._rating = rating;

    // Getters and setters
    this.getID = function () {
        return this._ID;
    }

    this.setID = function (value) {
        this._ID = value;
    }

    this.getAuthor = function () {
        return this._author;
    }

    this.setAuthor = function (value) {
        this._author = value;
    }

    this.getDate = function () {
        return this._date;
    }

    this.setDate = function (value) {
        this._date = value;
    }

    this.getComment = function () {
        return this._comment;
    }

    this.setComment = function (value) {
        this._comment = value;
    }

    this.getRating = function () {
        return this._rating;
    }

    this.setRating = function (value) {
        this._rating = value;
    }
}

/**
 * Searches the word in products.
 * @param {array} products 
 * @param {string} search 
 * @returns The array with products which has the search word.
 */
function searchProducts(products, search) {
    let searchResult = [];

    products.forEach((product, idx, array) => {
        let str = `${product.getName()} ${product.getDescription()}`.toLowerCase();

        let prod = findSearchWordInProduct(search, str, searchResult, product);

        if (prod !== null)
            searchResult.push(prod);
    });

    return searchResult;
}

/**
 * Finds the search word in the product.
 * @param {string} search 
 * @param {string} str 
 * @param {Product} product 
 * @returns product or null.
 */
function findSearchWordInProduct(search, str, product) {
    let searchIdx = 0;
    let startCountingLetters = false;
    let prevLetter = '';
    let searchWord = search.toLowerCase();

    // Split search word to array and use forEach
    str.split('').forEach((letter, idx, array) => {

        // If letter equals a letter from searchWord
        if (letter === searchWord[searchIdx]) {
            // When found the first letter in row or the first letter
            // in a word which equals letter from search than changes the flag to true.
            if (searchIdx === 0 && (prevLetter === ' ' || prevLetter === '')) {
                startCountingLetters = true;
            }
            if (startCountingLetters) {
                searchIdx++;
            }
            if (searchIdx === search.length) {
                return product;
            }
        } else {
            searchIdx = 0;
        }
        prevLetter = letter;
    });

    return null;
}

/**
 * Sorts the products array by rules in place.
 * Allowed that rules: "name", "price", "ID".
 * @param {array} products 
 * @param {string} sortRule 
 */
function sortProducts(products, sortRule) {
    switch (sortRule) {
        case "name":
            products.sort(sortByName);
            break;
        case "price":
            products.sort(sortByPrice);
            break;
        case "ID":
            products.sort(sortByID);
            break;
    };

    function sortByPrice(a, b) {
        return a.getPrice() - b.getPrice()
    }

    function sortByID(a, b) {
        if (a.getID() > b.getID()) return 1;
        if (a.getID() == b.getID()) return 0;
        if (a.getID() < b.getID()) return -1;
    };

    function sortByName(a, b) {
        if (a.getName() > b.getName()) return 1;
        if (a.getName() == b.getName()) return 0;
        if (a.getName() < b.getName()) return -1;
    };
}

// Create Product instances
let pad = new Product("KFC325", "Galaxy Tab 10", "Mobile pad", 375.23, "Samsung", "L", 100, new Date(), ["img1.jpg"]);
let iPhone = new Product("ASC345", "iPhone", "mobile phone", 999.99, "Apple", "XL", 100, new Date(), ["img1.jpeg", "img2.jpeg", "img3.jpeg"])
let phone = new Product("ADF976", "Pro Alpha 99", "The best mobile phone", 300, "Xiaomi", "S", 30, new Date(), ["img1.jpg"]);
let staff = new Product("ASR643", "phonesnets", "Cool stuff", 73, "Tablets", "XL", 888, new Date(), []);

// // test searchProducts
let res = searchProducts([pad, iPhone, phone, staff], "Phone");

for (const obj of res) {
    console.log(obj);
}

// test sortProducts
let products = [pad, iPhone, phone, staff];

sortProducts(products, "price");

for (const obj of products) {
    console.log(obj);
}

// test getAverageRating
pad.addReview('AS23ID', 'Alex', new Date(), 'nice pad', { 'service': 4.2, 'price': 2.3, 'value': 3.2, 'quality': 4.3 });
pad.addReview('DK42OP', 'Tanya', new Date(), 'bad pad', { 'service': 4.2, 'price': 2.3, 'value': 3.2, 'quality': 4.3 });

// pad.deleteReview('AS23ID');

pad.getReviews().forEach((val, idx, arr) => console.log(val));

console.log(pad.getAverageRating());

