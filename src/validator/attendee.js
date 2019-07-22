import validator from 'validator';
import isEmpty from '../util/is-Empty';

module.exports = function validateRegisterInput(data) {
    let errors = {};
    data.attendee_name = !isEmpty(data.attendee_name) ? data.attendee_name : "";
    data.gender = !isEmpty(data.gender) ? data.gender : "";
    data.present_location = !isEmpty(data.present_location) ? data.present_location : "";

    if (!validator.isLength(data.attendee_name, {min: 2, max: 100})) {
        errors.attendee_name = 'name must be between 2 and 100 characters';
    }
    if (validator.isEmpty(data.attendee_name)) {
        errors.attendee_name = "name is required";
    }
    if (validator.isEmpty(data.gender)) {
        errors.gender = "gender is required";
    }
    if (validator.isEmpty(data.present_location)) {
        errors.present_location = "present_location is required";
    }
    return {errors, isValid: isEmpty(errors)}

};
