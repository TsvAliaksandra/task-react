const Validator = require('validator');
const isEmpty = require('lodash/isEmpty');


function validateInput(data) {
    let errors = {};

    if (Validator.isEmpty(data.username)) {
        errors.username = 'Name is required';
    }

    if (Validator.isEmpty(data.phone)) {
        errors.phone = 'Phone number is required';
    }

    if (!Validator.isEmail(data.email)) {
        errors.email = 'Email is invalid';
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
}
module.exports = validateInput;