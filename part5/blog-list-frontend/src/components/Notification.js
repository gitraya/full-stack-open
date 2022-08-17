import PropTypes from "prop-types";

const Notification = ({ type = "error", message }) => {
  if (!message) {
    return null;
  }

  return <div className={`base-notification ${type}`}>{message}</div>;
};

Notification.propTypes = {
  type: PropTypes.string,
  message: PropTypes.string,
};

export default Notification;
