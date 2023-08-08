import { useRef, useState } from 'react';
import validate from './lib/formValidator';

const App = () => {
  const [validationErrors, setValidationErrors] = useState({});
  const [isValid, setValid] = useState(false);
  const formRef = useRef();

  const onSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData(formRef.current);
    const formValues = {
      firstName: formData.get('firstName'),
      lastName: formData.get('lastName'),
      email: formData.get('email'),
      message: formData.get('message'),
    };

    const [isFormValid, errors] = validate(formValues);

    if (!isFormValid) {
      setValidationErrors(errors);
      setValid(false);
    } else {
      setValid(true);
    }
  };

  return (
    <div>
      <form ref={formRef} onChange={onSubmit}>
        <input name="firstName" placeholder="First Name" />
        <label className="validation-error" htmlFor="firstName">
          {validationErrors.firstName}
        </label>

        <input name="lastName" placeholder="Last Name" />
        <label className="validation-error" htmlFor="lastName">
          {validationErrors.lastName}
        </label>

        <input name="email" placeholder="Email" />
        <label className="validation-error" htmlFor="email">
          {validationErrors.email}
        </label>

        <textarea name="message" placeholder="Message" />
        <label className="validation-error" htmlFor="message">
          {validationErrors.message}
        </label>

        <button disabled={!isValid} type="submit">
          Submit
        </button>
      </form>
    </div>
  );
};

export default App;
