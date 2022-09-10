import { useState } from "react";
import PropTypes from "prop-types";
import { TextInput, Label, Button } from "flowbite-react";
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
          type: "failure",
        })
      );
    }
  };

  return (
    <form
      onSubmit={handleCreate}
      className="flex flex-col gap-4 w-10/12 sm:w-1/2 lg:w-4/12 mb-4"
    >
      <h2 className="text-xl">Create New</h2>
      <div>
        <div className="mb-2 block">
          <Label htmlFor="title" value="Title:" />
        </div>
        <TextInput
          id="title"
          name="Title"
          type="title"
          required={true}
          value={title}
          onChange={({ target }) => setTitle(target.value)}
        />
      </div>
      <div>
        <div className="mb-2 block">
          <Label htmlFor="author" value="Author:" />
        </div>
        <TextInput
          id="author"
          name="Author"
          type="author"
          required={true}
          value={author}
          onChange={({ target }) => setAuthor(target.value)}
        />
      </div>
      <div>
        <div className="mb-2 block">
          <Label htmlFor="url" value="Url:" />
        </div>
        <TextInput
          id="url"
          name="Url"
          type="url"
          required={true}
          value={url}
          onChange={({ target }) => setUrl(target.value)}
        />
      </div>
      <Button type="submit">Create</Button>
    </form>
  );
};

BlogForm.propTypes = {
  blogFormRef: PropTypes.func,
};

export default BlogForm;
