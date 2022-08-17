import "./index.css";
import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import BlogForm from "./components/Forms/Blog";
import LoginForm from "./components/Forms/Login";
import Notification from "./components/Notification";
import blogService from "./services/blogs";

const App = () => {
  const [blogs, setBlogs] = useState([]);

  const [user, setUser] = useState(null);
  const [notification, setNotification] = useState(null);

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

  const onUpdateBlogs = (newBlog) =>
    setBlogs((initialBlogs) => [...initialBlogs, newBlog]);

  const handleLogout = () => {
    window.localStorage.removeItem("loggedBlogappUser");
    window.location.reload();
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

      <BlogForm
        onUpdateBlogs={onUpdateBlogs}
        setNotification={setNotification}
      />

      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  );
};

export default App;
