import { useState } from "react";
import PropTypes from "prop-types";

const Blog = ({ blog, onLike, onRemove }) => {
  const loggedUser = window.localStorage.getItem("loggedBlogappUser");
  const user = loggedUser ? JSON.parse(loggedUser) : null;

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

  const handleLike = () => onLike(blog);
  const handleRemove = () => onRemove(blog);

  return (
    <div style={blogStyle}>
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
  onLike: PropTypes.func.isRequired,
  onRemove: PropTypes.func.isRequired,
};

export default Blog;
