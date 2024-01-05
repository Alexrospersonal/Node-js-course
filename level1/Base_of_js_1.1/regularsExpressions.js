"use strict"

/**
 * Create object with three validators: phone, email and password.
 */
function Validator() {

    /**
     * Validate email
     * @param {string} email 
     * @returns boolean result of validation
     */
    this.validateEmail = function (email) {

        let regExp = /^[a-z0-9]+[-+.a-z0-9]{1,18}@[\w.!$%&’*+/=?^_-]{1,15}\.[a-z]{1,5}$/i;

        return regExp.test(email);
    };

    /**
     * Validate phone number
     * @param {string} phone 
     * @returns boolean result of validation
     */
    this.validatePhone = function (phone) {
        if (phone.length > 25)
            return false;

        let regExp = /(^\+38\s*)?(\-*\s*)?(\(?(\d{1}[\s\-]*){3}\)?){1}(\s*\-*(\d{1}\s*\-*){1,3}){1}((\d{1}\s*\-*){1,4}){1}/;

        return phone.match(regExp)[0].length === phone.length;
    };

    /**
     * Validate the password
     * @param {string} password 
     * @returns boolean result of validation
     */
    this.validatePassword = function (password) {
        return /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])[\w]{8,}$/.test(password);
    };
}

let validator = new Validator();

// Test password
// console.log("----valid----");
// validator.validatePassword("C00l_Pass");
// validator.validatePassword("SupperPas1");

// console.log("----invalid----");
// validator.validatePassword("Cool_pass");
// validator.validatePassword("C00l");

// Test email
// console.log("----valid----");
// validator.validateEmail("fi@secondpart.end");
// validator.validateEmail("first-part@.se=cond%p.art.end");
// validator.validateEmail("first.part@se=cond%part.r");

// console.log("----invalid----");
// validator.validateEmail("f@secondpart.end");
// validator.validateEmail("f@secondart.end,");
// validator.validateEmail("first-part@.se=cond@part.end");
// validator.validateEmail("-firstpart@.se=cond%.enddeded");
// validator.validateEmail("firs_tpart@.se.en");
// validator.validateEmail("firstpart@.se.enddeded");

// Test phone
// console.log("----valid----");
// validator.validatePhone("+38 (099) 567 8901");
// validator.validatePhone("+38 099 5 6 7 8 9  01");
// validator.validatePhone("(09-9) 567-890-1");
// validator.validatePhone("--  (099) 567 890-1");

// console.log("----invalid----");
// validator.validatePhone("+38 (099) 567 8901 0");
// validator.validatePhone("+38 099 a0000000");
// validator.validatePhone("+38 (0989) 567 8901");
// validator.validatePhone("+48 (0989) 567 8901");



// 1231231223123131_FILE_NAME.EXTENSION.OTHEREXTENSION

// 1_This_is_an_otherExample.mpg.OTHEREXTENSIONadasdassdassds34

// 1231231223123131_myFile.tar.gz2

// FILE_NAME.EXTENSION

// This_is_an_otherExample.mpg

// myFile.tar

let regExp = /(?<=\d+\_+)(\w+_*\w+){1,}\.[a-z0-9]+/i;

console.log("1231231223123131_FILE_NAME.EXTENSION.OTHEREXTENSION".match(regExp)[0]);
console.log("1_This_is_an_otherExample.mpg.OTHEREXTENSIONadasdassdassds34".match(regExp)[0]);
console.log("1231231223123131_myFile.tar.gz2".match(regExp)[0]);