import { useState } from "react";
import { useDispatch } from "react-redux";
import { Button, TextInput, Label } from "flowbite-react";
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
          type: "failure",
        })
      );
    }
  };

  return (
    <form
      onSubmit={handleLogin}
      className="flex flex-col gap-4 w-10/12 sm:w-1/2 lg:w-4/12"
    >
      <div>
        <div className="mb-2 block">
          <Label htmlFor="username" value="Username" />
        </div>
        <TextInput
          id="username"
          name="Username"
          type="text"
          required={true}
          value={username}
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        <div className="mb-2 block">
          <Label htmlFor="password" value="Password" />
        </div>
        <TextInput
          id="password"
          name="Password"
          type="password"
          required={true}
          value={password}
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <Button type="submit">Login</Button>
    </form>
  );
};

export default LoginForm;
