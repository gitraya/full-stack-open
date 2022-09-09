import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../reducers/user";

const NavBar = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const handleLogout = () => dispatch(logoutUser());

  return (
    <nav
      style={{
        background: "lightgray",
      }}
    >
      <ul
        style={{
          display: "flex",
          gap: "10px",
          listStyle: "none",
          padding: "5px",
        }}
      >
        <li>
          <Link to="/">blogs</Link>
        </li>
        <li>
          <Link to="/users">users</Link>
        </li>
        <li>
          {user.name} logged in <button onClick={handleLogout}>logout</button>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
