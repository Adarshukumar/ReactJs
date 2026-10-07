// Lesson 27 — testing React: my notes. Author: Adarsh

// The stack: Vitest/Jest (runner) + React Testing Library (components)
// Philosophy: test what USERS do — query by role/text, not by internals.

// import { render, screen } from "@testing-library/react";
// import userEvent from "@testing-library/user-event";

// test("counter increments", async () => {
//   render(<Counter />);
//   await userEvent.click(screen.getByRole("button", { name: "+1" }));
//   expect(screen.getByText(/count: 1/i)).toBeInTheDocument();
// });

// Queries priority (RTL docs): getByRole > getByLabelText > getByText
// getBy* -> throws if missing      queryBy* -> null (for absence checks)
// findBy* -> async waits (data loads)

// The one test EVERY fetch component deserves:
// test("shows error on failure", async () => {
//   vi.spyOn(global, "fetch").mockRejectedValue(new Error("boom"));
//   render(<UserProfile userId={1} />);
//   expect(await screen.findByText(/error/i)).toBeInTheDocument();
// });

// Component tests I always write:
// - renders with default props
// - user interaction changes the DOM (click, type)
// - error/loading states actually show

// E2E: Playwright for the flows that must never break (login, checkout).
// Don't chase 100% coverage — chase confidence in critical paths.

// Practice: test a controlled input + submit flow: type, submit, assert.
