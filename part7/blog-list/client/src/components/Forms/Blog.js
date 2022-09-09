import { useState } from "react";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { createBlog } from "../../reducers/blog";
import { setNotification } from "../../reducers/notification";

const BlogForm = ({ onCreateSuccess = () => {} }) => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  const handleCreate = async (event) => {
    event.preventDefault();

    try {
      await dispatch(createBlog({ title, author, url }));
      dispatch(
        setNotification({
          message: `a new blog ${title} by ${author} added`,
          type: "success",
        })
      );

      onCreateSuccess();

      setTitle("");
      setAuthor("");
      setUrl("");
    } catch (exception) {
      dispatch(
        setNotification({
          message: "failed to add a new blog",
          type: "error",
        })
      );
    }
  };

  return (
    <form onSubmit={handleCreate}>
      <h2>create new</h2>
      <div>
        title:
        <input
          required
          type="title"
          value={title}
          name="Title"
          onChange={({ target }) => setTitle(target.value)}
        />
      </div>
      <div>
        author:
        <input
          required
          type="author"
          value={author}
          name="Author"
          onChange={({ target }) => setAuthor(target.value)}
        />
      </div>
      <div>
        url
        <input
          required
          type="url"
          value={url}
          name="Url"
          onChange={({ target }) => setUrl(target.value)}
        />
      </div>
      <button type="submit">create</button>
    </form>
  );
};

BlogForm.propTypes = {
  blogFormRef: PropTypes.func,
};

export default BlogForm;
