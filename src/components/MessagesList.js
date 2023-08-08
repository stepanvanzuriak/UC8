import { useSelector } from 'react-redux';
import { getRecords } from '../redux/selectors';
import Message from './Message';

const MessagesList = () => {
  const records = useSelector(getRecords);

  return (
    <div data-testid="messages-list" className="messages-list">
      {records.map(({ firstName, lastName, email, message }) => {
        return (
          <Message
            key={`${firstName} ${lastName} ${email} ${message}`}
            firstName={firstName}
            lastName={lastName}
            email={email}
            message={message}
          />
        );
      })}
    </div>
  );
};

export default MessagesList;
