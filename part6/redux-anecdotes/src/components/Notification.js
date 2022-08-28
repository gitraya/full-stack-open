import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearNotification } from "../reducers/notificationReducer";

const Notification = () => {
  const dispatch = useDispatch();
  const notification = useSelector((state) => state.notification);
  const style = {
    border: "solid",
    padding: 10,
    borderWidth: 1,
  };

  useEffect(() => {
    if (notification) {
      setTimeout(() => dispatch(clearNotification()), 5000);
    }
  }, [notification, dispatch]);

  return Boolean(notification) ? (
    <div style={style}>{notification}</div>
  ) : (
    <></>
  );
};

export default Notification;
