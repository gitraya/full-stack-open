const dummy = (blogs) => 1;

const totalLikes = (blogs) => blogs.reduce((sum, blog) => sum + blog.likes, 0);

const favoriteBlog = (blogs) => {
  const createFavoriteBlog = (blog) => ({
    title: blog.title,
    author: blog.author,
    likes: blog.likes,
  });

  const defaultBlog = blogs[0] ? createFavoriteBlog(blogs[0]) : null;

  return blogs.reduce(
    (prev, curr) =>
      curr.likes > prev.likes
        ? createFavoriteBlog(curr)
        : createFavoriteBlog(prev),
    defaultBlog
  );
};

const mostBlogs = (blogs) => {
  const authorBlogs = blogs.reduce((prev, curr) => {
    prev[curr.author] = (prev[curr.author] || 0) + 1;
    return prev;
  }, {});

  const mostBlogsAuthor = Object.keys(authorBlogs).reduce((prev, curr) => {
    return authorBlogs[prev] > authorBlogs[curr] ? prev : curr;
  }, "");

  return {
    author: mostBlogsAuthor,
    blogs: authorBlogs[mostBlogsAuthor],
  };
};

const mostLikes = (blogs) => {
  const authorLikes = blogs.reduce((prev, curr) => {
    prev[curr.author] = (prev[curr.author] || 0) + curr.likes;
    return prev;
  }, {});

  const mostLikesAuthor = Object.keys(authorLikes).reduce((prev, curr) => {
    return authorLikes[prev] > authorLikes[curr] ? prev : curr;
  }, "");

  return {
    author: mostLikesAuthor,
    likes: authorLikes[mostLikesAuthor],
  };
};

module.exports = { dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes };
