import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const Blog = ({ blog }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
    display: "flex",
    flexDirection: "column",
  };

  return (
    <div data-testid="blog-card" style={blogStyle}>
      <Link to={`/blogs/${blog.id}`}>
        <span>
          {blog.title} {blog.author}
        </span>
      </Link>
    </div>
  );
};

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
};

export default Blog;
