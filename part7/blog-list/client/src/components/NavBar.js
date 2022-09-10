import { Link } from "react-router-dom";
import { Dropdown } from "flowbite-react";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../reducers/user";

const NavBar = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const handleLogout = () => dispatch(logoutUser());

  return (
    <nav className="bg-blue-500 text-white">
      <ul className="flex gap-4 list-none p-4 px-5 sm:px-10">
        <li>
          <Link to="/">Blogs</Link>
        </li>
        <li>
          <Link to="/users">Users</Link>
        </li>
        <li className="ml-auto">
          <Dropdown label={user.name} inline={true}>
            <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
          </Dropdown>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
