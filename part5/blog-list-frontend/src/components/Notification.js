const Notification = ({ type = "error", message }) => {
  if (!message) {
    return null;
  }

  return <div className={`base-notification ${type}`}>{message}</div>;
};

export default Notification;
