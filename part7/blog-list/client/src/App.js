import "./index.css";
import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { initializeLoginUser, logoutUser } from "./reducers/user";
import { initializeBlogs } from "./reducers/blog";
import Blog from "./components/Blog";
import BlogForm from "./components/Forms/Blog";
import LoginForm from "./components/Forms/Login";
import Notification from "./components/Notification";
import Togglable from "./components/Togglable";

const App = () => {
  const dispatch = useDispatch();
  const blogs = useSelector((state) =>
    state.blogs.slice().sort((a, b) => b.likes - a.likes)
  );
  const user = useSelector((state) => state.user);

  const blogFormRef = useRef();

  useEffect(() => {
    dispatch(initializeBlogs());
  }, [dispatch]);

  useEffect(() => {
    dispatch(initializeLoginUser());
  }, []);

  const handleLogout = () => dispatch(logoutUser());

  if (!user) {
    return (
      <div>
        <h2>Log in to application</h2>
        <Notification />
        <LoginForm />
      </div>
    );
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification />
      <p>
        {user.name} logged in <button onClick={handleLogout}>logout</button>
      </p>

      <Togglable buttonLabel="create new blog" ref={blogFormRef}>
        <BlogForm
          onCreateSuccess={() => blogFormRef.current.toggleVisibility()}
        />
      </Togglable>

      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  );
};

export default App;
