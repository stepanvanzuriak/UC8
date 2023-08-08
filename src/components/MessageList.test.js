import { render, screen } from '@testing-library/react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import MessagesList from './MessagesList';

describe('MessageList', () => {
  it('renders empty list', () => {
    const store = createStore(() => ({records: []}));

    render(
      <Provider store={store}>
        <MessagesList />
      </Provider>,
    );

    const list = screen.getByTestId('messages-list');

    expect(list).toBeEmptyDOMElement();
  });

  it('renders list', () => {
    const store = createStore(() => ({records: [{
      firstName: 'firstName',
      lastName: 'lastName',
      email: 'email',
      message: 'some long message'
    }]}));

    render(
      <Provider store={store}>
        <MessagesList />
      </Provider>,
    );

    const list = screen.getByTestId('messages-list');

    expect(list).not.toBeEmptyDOMElement();
  });
});
