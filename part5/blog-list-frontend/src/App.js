import "./index.css";
import { useState, useEffect, useRef } from "react";
import blogService from "./services/blogs";
import Blog from "./components/Blog";
import BlogForm from "./components/Forms/Blog";
import LoginForm from "./components/Forms/Login";
import Notification from "./components/Notification";
import Togglable from "./components/Togglable";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [notification, setNotification] = useState(null);
  const blogFormRef = useRef();

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setNotification(null);
    }, 5000);
  }, [notification]);

  const handleLogout = () => {
    window.localStorage.removeItem("loggedBlogappUser");
    window.location.reload();
  };

  const onCreateBlog = async ({ title, author, url }) => {
    try {
      const newBlog = await blogService.create({ title, author, url });

      setBlogs((initialBlogs) => [...initialBlogs, newBlog]);

      setNotification({
        message: `a new blog ${title} by ${author} added`,
        type: "success",
      });

      blogFormRef.current.toggleVisibility();
    } catch (exception) {
      setNotification({
        message: "failed to add a new blog",
        type: "error",
      });
    }
  };

  const onLikeBlog = async (blog) => {
    try {
      const updatedBlog = await blogService.updateLike(blog.id);
      setBlogs((initialBlogs) =>
        initialBlogs.map((b) => (b.id === blog.id ? updatedBlog : b))
      );

      setNotification({
        message: `liked blog ${blog.title} by ${blog.author}`,
        type: "success",
      });
    } catch (exception) {
      setNotification({
        message: `failed to like blog ${blog.title}`,
        type: "error",
      });
    }
  };

  const onRemoveBlog = async (blog) => {
    if (!window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
      return;
    }

    try {
      await blogService.remove(blog.id);
      setBlogs((initialBlogs) => initialBlogs.filter((b) => b.id !== blog.id));

      setNotification({
        message: `removed blog ${blog.title} by ${blog.author}`,
        type: "success",
      });
    } catch (exception) {
      setNotification({
        message: `failed to remove blog ${blog.title}`,
        type: "error",
      });
    }
  };

  if (!user) {
    return (
      <div>
        <h2>Log in to application</h2>
        <Notification
          type={notification?.type}
          message={notification?.message}
        />
        <LoginForm setUser={setUser} setNotification={setNotification} />
      </div>
    );
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification type={notification?.type} message={notification?.message} />
      <p>
        {user.name} logged in <button onClick={handleLogout}>logout</button>
      </p>

      <Togglable buttonLabel="create new blog" ref={blogFormRef}>
        <BlogForm onCreate={onCreateBlog} />
      </Togglable>

      {blogs.map((blog) => (
        <Blog
          key={blog.id}
          blog={blog}
          onLike={onLikeBlog}
          onRemove={onRemoveBlog}
        />
      ))}
    </div>
  );
};

export default App;
