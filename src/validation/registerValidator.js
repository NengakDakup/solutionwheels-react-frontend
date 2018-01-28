import Validator from 'validator';
import isEmpty from './isEmpty';

function validateRegisterInput(data) {
    let errors = {};
    data.name = !isEmpty(data.name) ? data.name : '';
    data.email = !isEmpty(data.email) ? data.email : '';
    data.password = !isEmpty(data.password) ? data.password : '';

    if (!Validator.isLength(data.name, {min: 6, max: 30})){
        errors.name = 'Name must be between 6 and 30 characters';
    }

    if (!Validator.isLength(data.password, {min: 4, max: 30})){
        errors.password = 'Password must not be less than 4 Characters';
    }

    if (!Validator.isEmail(data.email)){
        errors.email = 'Invalid Email';
    }

    if(Validator.isEmpty(data.name)) {
        errors.name = 'Name field is required';
    }

    if(Validator.isEmpty(data.email)) {
        errors.email = 'Email field is required';
    }

    if(Validator.isEmpty(data.password)) {
        errors.password = 'Password field is required';
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
}

export default validateRegisterInput;
