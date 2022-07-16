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

module.exports = { dummy, totalLikes, favoriteBlog };
