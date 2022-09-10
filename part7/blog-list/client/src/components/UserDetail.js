import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import userService from "../services/users";

const UserDetail = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);

  useEffect(() => {
    userService.getById(id).then((user) => setUser(user));
  }, [id]);

  if (!user) {
    return null;
  }

  return (
    <>
      <h2 className="text-2xl mb-4">{user.name}</h2>
      <h3 className="text-lg mb-4">added blogs</h3>
      <ul className="list-disc pl-9">
        {user.blogs?.map((blog) => (
          <li key={blog.id}>
            <Link
              to={`/blogs/${blog.id}`}
              className="font-medium text-blue-600 hover:underline dark:text-blue-500"
            >
              {blog.title}
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
};

export default UserDetail;
