import { Card } from "flowbite-react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const Blog = ({ blog }) => {
  return (
    <Card>
      <Link
        to={`/blogs/${blog.id}`}
        className="font-medium text-blue-600 hover:underline dark:text-blue-500"
      >
        <span>
          {blog.title} {blog.author}
        </span>
      </Link>
    </Card>
  );
};

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
};

export default Blog;
