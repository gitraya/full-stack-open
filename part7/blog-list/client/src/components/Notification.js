import { useSelector } from "react-redux";
import { Alert } from "flowbite-react";

const Notification = () => {
  const notification = useSelector((state) => state.notification);

  if (!notification?.message) {
    return null;
  }

  return (
    <Alert color={notification.type}>
      <span>{notification.message}</span>
    </Alert>
  );
};

export default Notification;
