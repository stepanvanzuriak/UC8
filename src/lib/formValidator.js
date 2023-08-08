import validator from 'validator';

const validate = ({
  firstName = '',
  lastName = '',
  email = '',
  message = '',
} = {}) => {
  let errors = {};

  if (firstName.length < 1) {
    errors = { ...errors, firstName: "First name shouldn't be empty" };
  }

  if (lastName.length < 1) {
    errors = { ...errors, lastName: "Last name shouldn't be empty" };
  }

  if (!validator.isEmail(email)) {
    errors = { ...errors, email: 'Email should be valid' };
  }

  if (message.length < 10) {
    errors = {
      ...errors,
      message: 'Message should be at least 10 characters long',
    };
  }

  return [!Object.keys(errors).length, errors];
};

export default validate;
