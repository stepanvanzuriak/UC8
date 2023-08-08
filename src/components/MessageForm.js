import { useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import validate from '../lib/formValidator';
import { addRecord } from '../redux/actions';
import debounce from '../lib/debounce';

const MessageForm = () => {
  const [validationErrors, setValidationErrors] = useState({});
  const [isValid, setValid] = useState(false);
  const formRef = useRef();
  const dispatch = useDispatch();

  const getFormValues = () => {
    const formData = new FormData(formRef.current);
    return {
      firstName: formData.get('firstName'),
      lastName: formData.get('lastName'),
      email: formData.get('email'),
      message: formData.get('message'),
    };
  };

  const onChange = debounce(() => {
    const formValues = getFormValues();

    const [isFormValid, errors] = validate(formValues);

    if (isFormValid) {
      setValid(true);
      setValidationErrors({});
    } else {
      setValidationErrors(errors);
      setValid(false);
    }
  }, 300);

  const onSubmit = (e) => {
    e.preventDefault();

    dispatch(addRecord(getFormValues()));
    formRef.current.reset();
  };

  return (
    <form data-testid="message-form" ref={formRef} onChange={onChange} onSubmit={onSubmit}>
      <input name="firstName" placeholder="First Name" />
      <label data-testid="first-name-label" className="validation-error" htmlFor="firstName">
        {validationErrors.firstName}
      </label>

      <input name="lastName" placeholder="Last Name" />
      <label data-testid="last-name-label" className="validation-error" htmlFor="lastName">
        {validationErrors.lastName}
      </label>

      <input name="email" placeholder="Email" />
      <label data-testid="email-label" className="validation-error" htmlFor="email">
        {validationErrors.email}
      </label>

      <textarea name="message" placeholder="Message" />
      <label data-testid="message-label" className="validation-error" htmlFor="message">
        {validationErrors.message}
      </label>

      <button disabled={!isValid} type="submit">
        Submit
      </button>
    </form>
  );
};

export default MessageForm;
