import { useState } from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { likeBlog, removeBlog } from "../reducers/blog";
import { setNotification } from "../reducers/notification";

const Blog = ({ blog }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  const [visible, setVisible] = useState(false);
  const isBlogOwned = user?.id === blog?.user?.id;

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
    display: "flex",
    flexDirection: "column",
  };
  const removeStyle = {
    backgroundColor: "red",
    color: "white",
    width: "min-content",
  };
  const parentDetailStyle = {
    display: "flex",
    flexDirection: "column",
  };

  const toggleVisibility = () => setVisible(!visible);

  const handleLike = async () => {
    try {
      await dispatch(likeBlog(blog.id));
      dispatch(
        setNotification({
          message: `liked blog ${blog.title} by ${blog.author}`,
          type: "success",
        })
      );
    } catch (exception) {
      dispatch(
        setNotification({
          message: `failed to like blog ${blog.title}`,
          type: "error",
        })
      );
    }
  };

  const handleRemove = async () => {
    if (!window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
      return;
    }

    try {
      await dispatch(removeBlog(blog.id));
      dispatch(
        setNotification({
          message: `removed blog ${blog.title} by ${blog.author}`,
          type: "success",
        })
      );
    } catch (exception) {
      dispatch(
        setNotification({
          message: `failed to remove blog ${blog.title}`,
          type: "error",
        })
      );
    }
  };

  return (
    <div data-testid="blog-card" style={blogStyle}>
      <span>
        {blog.title} {blog.author}{" "}
        <button onClick={toggleVisibility}>{visible ? "hide" : "view"}</button>
      </span>
      {visible && (
        <div data-testid="blog-detail" style={parentDetailStyle}>
          <a href={blog.url} target="_blank" rel="noreferrer">
            {blog.url}
          </a>
          <span>
            likes {blog.likes || "0"} <button onClick={handleLike}>like</button>
          </span>
          <span>{blog.user?.name || "-"}</span>
          {isBlogOwned && (
            <button style={removeStyle} onClick={handleRemove}>
              remove
            </button>
          )}
        </div>
      )}
    </div>
  );
};

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
};

export default Blog;
