import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Blog from "./Blog";

const blog = {
  title: "This is a test blog",
  author: "Author",
  url: "www.test.com",
  likes: 10,
  user: {
    name: "User",
  },
};

const mockHandler = jest.fn();

beforeEach(() =>
  render(<Blog blog={blog} onLike={mockHandler} onRemove={mockHandler} />)
);

test("renders title and author", () => {
  const element = screen.getByText(`${blog.title} ${blog.author}`);
  expect(element).toBeDefined();
});

test("do not render this by default", () => {
  const element = screen.queryByTestId("blog-detail");
  expect(element).toBeNull();
});

test("renders details when clicked", async () => {
  const user = userEvent.setup();
  const button = screen.getByText("view");
  await user.click(button);

  const element = screen.getByTestId("blog-detail");
  expect(element).toBeDefined();
});

test("when like button is clicked, calls onLike", async () => {
  const user = userEvent.setup();
  const button = screen.getByText("view");
  await user.click(button);

  const likeButton = screen.getByText("like");
  await user.dblClick(likeButton);

  expect(mockHandler).toHaveBeenCalledTimes(2);
});
