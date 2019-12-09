import Validator from 'validator';
import isEmpty from './isEmpty';

function validateRegisterInput(data) {
    let errors = {};
    data.title = !isEmpty(data.title) ? data.title : '';
    data.body = !isEmpty(data.body) ? data.body : '';

    if(Validator.isEmpty(data.title)) {
        errors.title = 'Question title is required';
    }

    if(!isEmpty(data.title)){
      if (!Validator.isLength(data.title, {min: 20, max: 200})){
          errors.title = 'Question title must be between 20 and 200 characters';
      }
    }

    if(!isEmpty(data.body)){
      if (!Validator.isLength(data.body, {min: 40, max: 3000})){
          errors.body = 'Explanation must not be less than 40 Characters';
      }
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
}

export default validateRegisterInput;
