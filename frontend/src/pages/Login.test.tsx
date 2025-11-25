import { render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { describe, it, expect } from "vitest";
import { MemoryRouter } from "react-router-dom";
import { authContent } from "../content/auth/auth";
import userEvent from "@testing-library/user-event";
import { validationMessages } from "../content/auth/validationMessages";
import Login from "./Login";

describe("Login", () => {
  const setup = () =>
    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );

  const getFields = (placeholder: typeof authContent.login.placeholders) => ({
    email: screen.getByPlaceholderText(placeholder.email),
    password: screen.getByPlaceholderText(placeholder.password),
  });

  it("shows and hides validation errors correctly after entering valid values", async () => {
    setup();

    const placeholder = authContent.login.placeholders;
    const validations = validationMessages.login;

    const { email, password } = getFields(placeholder);

    // Trigger validation by blur
    await userEvent.click(email);
    await userEvent.tab();

    await userEvent.click(password);
    await userEvent.tab();

    // Errors should appear
    expect(
      await screen.findByText(validations.email.invalid)
    ).toBeInTheDocument();
    expect(
      await screen.findByText(validations.password.tooShort)
    ).toBeInTheDocument();

    // Enter valid values
    await userEvent.type(email, "john18");
    await userEvent.tab();

    await userEvent.type(password, "Passwort123!");
    await userEvent.tab();

    // Errors should disappear (use waitFor because of framer-motion exit)
    await waitFor(() =>
      expect(
        screen.queryByText(validations.email.invalid)
      ).not.toBeInTheDocument()
    );

    await waitFor(() =>
      expect(
        screen.queryByText(validations.password.tooShort)
      ).not.toBeInTheDocument()
    );
  });

  it("keeps the login button disabled initially", () => {
    setup();

    const loginText = authContent.login.buttons.login;
    expect(screen.getByRole("button", { name: loginText })).toBeDisabled();
  });

  it("enables the login button when valid values are given", async () => {
    setup();

    const placeholder = authContent.login.placeholders;
    const { email, password } = getFields(placeholder);

    // Use your placeholder exactly as you want (email)
    await userEvent.type(email, placeholder.email);
    await userEvent.type(password, "Passwort123!");

    const loginText = authContent.login.buttons.login;

    expect(screen.getByRole("button", { name: loginText })).not.toBeDisabled();
  });

  it("toggles password visibility when clicking the eye-icon", async () => {
    setup();

    const placeholder = authContent.login.placeholders;
    const { password } = getFields(placeholder);

    const toggle = screen.getByTestId("password-toggle");

    // Before toggle
    expect(password).toHaveAttribute("type", "password");

    // Toggle → show
    await userEvent.click(toggle);
    expect(password).toHaveAttribute("type", "text");

    // Toggle → hide
    await userEvent.click(toggle);
    expect(password).toHaveAttribute("type", "password");
  });
});
