import "@testing-library/jest-dom/extend-expect";
import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import BlogForm from "./Blog";

const fields = {
  title: "This is a new blog",
  author: "New Author",
  url: "www.new.com",
};

test("<BlogForm/> updates parent state and calls onSubmit", async () => {
  const onCreate = jest.fn();
  const user = userEvent.setup();

  render(<BlogForm onCreate={onCreate} />);

  const inputs = screen.getAllByRole("textbox");
  const createButton = screen.getByText("create");

  inputs.forEach((input) =>
    fireEvent.change(input, { target: { value: fields[input.name] } })
  );

  await user.click(createButton);

  expect(onCreate).toHaveBeenCalledTimes(1);
  expect(onCreate.mock.calls[0][0]).toEqual(fields);
});
