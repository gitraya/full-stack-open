import { useRef } from "react";
import { useSelector } from "react-redux";
import Blog from "./Blog";
import BlogForm from "./Forms/Blog";
import Togglable from "./Togglable";

const BlogList = () => {
  const blogs = useSelector((state) =>
    state.blogs.slice().sort((a, b) => b.likes - a.likes)
  );
  const blogFormRef = useRef();

  return (
    <>
      <Togglable buttonLabel="create new blog" ref={blogFormRef}>
        <BlogForm
          onCreateSuccess={() => blogFormRef.current.toggleVisibility()}
        />
      </Togglable>
      <div className="flex flex-col gap-2 my-6">
        {blogs.map((blog) => (
          <Blog key={blog.id} blog={blog} />
        ))}
      </div>
    </>
  );
};

export default BlogList;
