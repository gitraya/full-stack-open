import { Button, TextInput } from "flowbite-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
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
          type: "failure",
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
          type: "failure",
        })
      );
    }
  };

  const handleComment = (event) => {
    event.preventDefault();

    const comment = event.target.Comment.value;
    event.target.Comment.value = "";

    blogService.addComment(blog.id, comment).then((blog) => setBlog(blog));

    dispatch(
      setNotification({
        message: `successfully added comment to blog ${blog.title}`,
        type: "success",
      })
    );
  };

  return (
    <>
      <h2 className="text-2xl mb-5">
        {blog.title} {blog.author}
      </h2>
      {isBlogOwned && (
        <div className="mb-4">
          <Button color="failure" onClick={handleRemove}>
            Remove
          </Button>
        </div>
      )}
      <div className="flex flex-col gap-1 mb-6">
        <a
          href={blog.url}
          target="_blank"
          rel="noreferrer"
          className="font-medium text-blue-600 hover:underline dark:text-blue-500"
        >
          {blog.url}
        </a>
        <span className="flex items-center gap-4">
          likes {blog.likes || "0"}{" "}
          <Button color="light" onClick={handleLike}>
            Like
          </Button>
        </span>
        <span>
          added by{" "}
          <Link
            to={`/users/${blog.user.id}`}
            className="font-medium text-blue-600 hover:underline dark:text-blue-500"
          >
            {blog.user.name}
          </Link>
        </span>
      </div>

      <h3 className="text-xl mb-5">Comments</h3>

      <form onSubmit={handleComment} className="flex gap-2 mb-5">
        <TextInput
          name="Comment"
          type="text"
          required={true}
          placeholder="comment"
        />
        <Button color="light" type="submit">
          Add Comment
        </Button>
      </form>

      {!blog.comments?.length && <p>no comments</p>}
      <ul className="list-disc pl-9">
        {blog.comments?.map((comment, index) => (
          <li key={index}>{comment}</li>
        ))}
      </ul>
    </>
  );
};

export default BlogDetail;
