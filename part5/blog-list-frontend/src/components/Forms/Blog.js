import { useState } from "react";
import blogService from "../../services/blogs";

const BlogForm = ({ onUpdateBlogs, setNotification }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  const handleCreate = async (event) => {
    event.preventDefault();

    try {
      const newBlog = await blogService.create({
        title,
        author,
        url,
      });

      onUpdateBlogs(newBlog);
      setTitle("");
      setAuthor("");
      setUrl("");

      setNotification({
        message: `a new blog ${title} by ${author} added`,
        type: "success",
      });
    } catch (exception) {
      setNotification({
        message: "failed to add a new blog",
        type: "error",
      });
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

export default BlogForm;
