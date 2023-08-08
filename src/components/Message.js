const Message = ({ firstName, lastName, email, message }) => {
  return (
    <div>
      <h2>
        {firstName} {lastName}
      </h2>
      <address>{email}</address>
      <p>{message}</p>
    </div>
  );
};

export default Message;
