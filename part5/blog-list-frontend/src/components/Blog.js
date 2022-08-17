import { useState } from "react";

const Blog = ({ blog, onLike, onRemove }) => {
  const user = JSON.parse(
    window.localStorage.getItem("loggedBlogappUser") || ""
  );

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
        <>
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
        </>
      )}
    </div>
  );
};

export default Blog;
