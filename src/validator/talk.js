import validator from 'validator';
import isEmpty from '../util/is-Empty';

module.exports = function validateRegisterInput(data) {
    let errors = {};
    data.title = !isEmpty(data.title) ? data.title : "";
    data.content = !isEmpty(data.content) ? data.content : "";

    if (!validator.isLength(data.title, {min: 2, max: 100})) {
        errors.title = 'title must be between 2 and 100 characters';

    }
    if (validator.isEmpty(data.title)) {
        errors.title = "title is required";
    }
    if (validator.isEmpty(data.content)) {
        errors.content = "content is required";
    }


    return {
        errors,
        isValid: isEmpty(errors)
    }

};
