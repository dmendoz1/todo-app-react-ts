import { describe, test, expect, afterEach } from "vitest";
import { render, cleanup, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import App from "./App";
import userEvent from "@testing-library/user-event";

afterEach(cleanup);

describe("App", () => {
  test("should render input field and add button", () => {
    render(<App />);
    const input = screen.getByRole("textbox", { name: "New Task:" });
    const button = screen.getByRole("button", { name: "Add Task" });

    expect(input).toBeInTheDocument();
    expect(button).toBeInTheDocument();
  });

  test("should add task to list when add button is clicked", async () => {
    const user = userEvent.setup();
    render(<App />);
    const input = screen.getByRole("textbox", { name: "New Task:" });
    const button = screen.getByRole("button", { name: "Add Task" });

    await user.type(input, "blah");
    await user.click(button);

    await waitFor(() => {
      expect(screen.getByText("blah")).toBeInTheDocument();
    });
  });

  test("should clear input field after adding a task", async () => {
    const user = userEvent.setup();
    render(<App />);

    const input = screen.getByRole("textbox", { name: "New Task:" });
    const button = screen.getByRole("button", { name: "Add Task" });

    await user.type(input, "New Task");
    await user.click(button);

    await waitFor(() => {
      expect(input).toHaveValue("");
    });
  });

  test("should not add an empty task to the list", async () => {
    const user = userEvent.setup();
    render(<App />);
    const input = screen.getByRole("textbox", { name: "New Task:" });
    const button = screen.getByRole("button", { name: "Add Task" });

    await user.clear(input);
    await user.click(button);

    await waitFor(() => {
      const listItems = screen.queryAllByRole("listitem");
      expect(listItems).toHaveLength(1); // Assuming there's one default task
    });
  });

  test('should add a task by pressing the "Enter" key', async () => {
    const user = userEvent.setup();
    render(<App />);
    const input = screen.getByRole("textbox", { name: "New Task:" });
    await user.type(input, "Task via Enter{Enter}");
    await waitFor(() => {
      expect(screen.queryAllByRole("listitem")).toHaveLength(2);
    });
  });
});
