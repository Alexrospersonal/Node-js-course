"use strict";
/**
 * File system object.
 */
const fs = require('node:fs');
/**
 * Constant for file address.
 */
const FILENAME = 'level1\\Base_of_js_1.1\\cities.csv';

/**
 * Read, parse file and change string.
 */
fs.readFile(FILENAME, 'utf8', (err, data) => {
    if (err) {
        console.error(err);
        return;
    }
    let changeCityInString = parseCitiesData(data)
    console.log(changeCityInString("Я люблю льВів але народився в дніпро"));
});

/**
 * @description parsing the string file to object where cities are keys.
 * @param {string} data 
 * @returns a function with parsed object.
 */
function parseCitiesData(data) {
    let res = data
        .split('\n')
        .filter(val => !/.+#.+,+|^#.*|^\s$/gi.test(val))
        .map(val => {
            let splitedVal = val.split(',');
            return { x: splitedVal[0], y: splitedVal[1], name: splitedVal[2], population: splitedVal[3] };
        })
        .sort((a, b) => b.population - a.population)
        .slice(0, 10)
        .reduce((accum, cur, idx) => {
            accum[cur.name] = { population: cur.population, rating: idx + 1 };
            return accum;
        }, {});

    /**
     *  Replace cities in string to cities with data from the object.
     */
    return (text) => {
        return text
            .split(' ')
            .map((val, idx, array) => {
                let titleWord = val.substring(0, 1).toUpperCase() + val.substring(1).toLowerCase();
                if (res[titleWord] !== undefined) {
                    return `${titleWord} (${res[titleWord].rating} місце в ТОП-10 найбільших міст України, населення ${res[titleWord].population} чоловік)`;
                }
                return val;
            })
            .join(' ');
    };
}

