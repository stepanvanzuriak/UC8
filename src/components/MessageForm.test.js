import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import MessageForm from './MessageForm';
import store from '../redux/store';

describe('MessageForm', () => {
  it('renders as form', () => {
    render(
      <Provider store={store}>
        <MessageForm />
      </Provider>,
    );

    const form = screen.getByTestId('message-form');

    expect(form).toBeInTheDocument();
  });

  it('it validates empty form', () => {
    render(
      <Provider store={store}>
        <MessageForm />
      </Provider>,
    );

    const submitButton = screen.getByRole('button');

    expect(submitButton).toBeDisabled();
  });

  it('it validates onChange', async () => {
    render(
      <Provider store={store}>
        <MessageForm />
      </Provider>,
    );

    const messageInput = screen.getByPlaceholderText('Message');
    const messageLabel = screen.getByTestId('message-label');

    userEvent.type(messageInput, 'a');

    // Wait on debounce
    await new Promise((resolve) => setTimeout(resolve, 500));

    expect(messageLabel).toHaveTextContent(
      'Message should be at least 10 characters long',
    );
  });

  it('updates records if form is valid', async () => {
    const data = {
      firstName: 'some name',
      lastName: 'some last name',
      email: 'test@test.com',
      message: 'some long message',
    };

    render(
      <Provider store={store}>
        <MessageForm />
      </Provider>,
    );
    const firstNameInput = screen.getByPlaceholderText('First Name');
    const lastNameInput = screen.getByPlaceholderText('Last Name');
    const emailInput = screen.getByPlaceholderText('Email');
    const messageInput = screen.getByPlaceholderText('Message');
    const submitButton = screen.getByRole('button');

    userEvent.type(firstNameInput, data.firstName);
    userEvent.type(lastNameInput, data.lastName);
    userEvent.type(emailInput, data.email);
    userEvent.type(messageInput, data.message);

    // Wait on debounce
    await new Promise((resolve) => setTimeout(resolve, 500));

    userEvent.click(submitButton);

    expect(store.getState().records[0]).toStrictEqual(data);
  });
});
