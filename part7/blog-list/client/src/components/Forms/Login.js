import { useState } from "react";
import { useDispatch } from "react-redux";
import { setNotification } from "../../reducers/notification";
import { loginUser } from "../../reducers/user";

const LoginForm = () => {
  const dispatch = useDispatch();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const user = await dispatch(loginUser({ username, password }));
      setUsername("");
      setPassword("");

      dispatch(
        setNotification({
          message: `welcome ${user.name}`,
          type: "success",
        })
      );
    } catch (exception) {
      dispatch(
        setNotification({
          message: "wrong username or password",
          type: "error",
        })
      );
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <div>
        username
        <input
          required
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
        <input
          required
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>
  );
};

export default LoginForm;
