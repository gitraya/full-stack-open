import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { likeBlog, removeBlog } from "../reducers/blog";
import { setNotification } from "../reducers/notification";
import blogService from "../services/blogs";

const BlogDetail = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const { id } = useParams();
  const [blog, setBlog] = useState(null);

  useEffect(() => {
    blogService.getById(id).then((blog) => setBlog(blog));
  }, []);

  if (!blog) {
    return null;
  }

  const isBlogOwned = user?.id === blog?.user?.id;

  const removeStyle = {
    backgroundColor: "red",
    color: "white",
    width: "min-content",
  };
  const parentDetailStyle = {
    display: "flex",
    flexDirection: "column",
  };

  const handleLike = async () => {
    try {
      await dispatch(likeBlog(blog.id));

      setBlog({ ...blog, likes: blog.likes + 1 });
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

      navigate("/");
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
    <>
      <h2>
        {blog.title} {blog.author}
      </h2>
      {isBlogOwned && (
        <button style={removeStyle} onClick={handleRemove}>
          remove
        </button>
      )}
      <div style={parentDetailStyle}>
        <a href={blog.url} target="_blank" rel="noreferrer">
          {blog.url}
        </a>
        <span>
          likes {blog.likes || "0"} <button onClick={handleLike}>like</button>
        </span>
        <span>added by {blog.user.name}</span>
      </div>
    </>
  );
};

export default BlogDetail;
