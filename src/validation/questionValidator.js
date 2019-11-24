import Validator from 'validator';
import isEmpty from './isEmpty';

function validateRegisterInput(data) {
    let errors = {};
    data.title = !isEmpty(data.title) ? data.title : '';
    data.body = !isEmpty(data.body) ? data.body : '';

    if (!Validator.isLength(data.title, {min: 6, max: 30})){
        errors.title = 'Question title must be between 6 and 30 characters';
    }


    if(!isEmpty(data.body)){
      if (!Validator.isLength(data.body, {min: 4, max: 3000})){
          errors.body = 'Explanation must not be less than 4 Characters';
      }
    }

    if(Validator.isEmpty(data.title)) {
        errors.title = 'Question title is required';
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
}

export default validateRegisterInput;
