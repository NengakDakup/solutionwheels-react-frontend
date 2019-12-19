import Validator from 'validator';
import isEmpty from './isEmpty';

function validateResetInput(data) {
    let errors = {};

    data.email = !isEmpty(data.email) ? data.email : '';

    if (!Validator.isEmail(data.email)){
        errors.email = 'Invalid Email';
    }

    if(Validator.isEmpty(data.email)) {
        errors.email = 'Email field is required';
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
}

export default validateResetInput;
