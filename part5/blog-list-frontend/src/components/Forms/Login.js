import { useState } from "react";
import PropTypes from "prop-types";
import loginService from "../../services/login";
import blogService from "../../services/blogs";

const LoginForm = ({ setUser, setNotification }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const user = await loginService.login({
        username,
        password,
      });

      window.localStorage.setItem("loggedBlogappUser", JSON.stringify(user));
      blogService.setToken(user.token);

      setUser(user);
      setUsername("");
      setPassword("");

      setNotification({
        message: `welcome ${user.name}`,
        type: "success",
      });
    } catch (exception) {
      setNotification({
        message: "wrong username or password",
        type: "error",
      });
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

LoginForm.propTypes = {
  setUser: PropTypes.func.isRequired,
  setNotification: PropTypes.func.isRequired,
};

export default LoginForm;
