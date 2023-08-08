import formValidator from '../formValidator.js';

describe('formValidator', () => {
  it('invalid with no params', () => {
    const [isValid] = formValidator();

    expect(isValid).toBe(false);
  });

  it('validates first name', () => {
    const [isValid, errors] = formValidator({
      firstName: '',
    });

    expect(isValid).toBe(false);
    expect(errors.firstName).toBe("First name shouldn't be empty");
  });

  it('validates last name', () => {
    const [isValid, errors] = formValidator({
      lastName: '',
    });

    expect(isValid).toBe(false);
    expect(errors.lastName).toBe("Last name shouldn't be empty");
  });

  it('validates empty email', () => {
    const [isValid, errors] = formValidator({
      email: '',
    });

    expect(isValid).toBe(false);
    expect(errors.email).toBe('Email should be valid');
  });

  it('validates email', () => {
    const [isValid, errors] = formValidator({
      email: 'invalid',
    });

    expect(isValid).toBe(false);
    expect(errors.email).toBe('Email should be valid');
  });

  it('validates message', () => {
    const [isValid, errors] = formValidator({
      message: '',
    });

    expect(isValid).toBe(false);
    expect(errors.message).toBe(
      'Message should be at least 10 characters long',
    );
  });

  it('valid if all fields valid', () => {
    const [isValid] = formValidator({
      firstName: 'some name',
      lastName: 'some last name',
      email: 'test@test.com',
      message: 'some long message',
    });

    expect(isValid).toBe(true);
  });
});
