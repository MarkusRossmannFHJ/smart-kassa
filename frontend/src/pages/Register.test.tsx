import { render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import Register from "./Register";
import { describe, it, expect } from "vitest";
import { MemoryRouter } from "react-router-dom";
import { authContent } from "../content/auth";
import userEvent from "@testing-library/user-event";
import { validationMessages } from "../content/validationMessages";

describe("Register", () => {
  const setup = () =>
    render(
      <MemoryRouter>
        <Register />
      </MemoryRouter>
    );

  const getFields = (placeholder: typeof authContent.register.placeholders) => ({
    username: screen.getByPlaceholderText(placeholder.username),
    email: screen.getByPlaceholderText(placeholder.email),
    atu: screen.getByPlaceholderText(placeholder.atu),
    fn: screen.getByPlaceholderText(placeholder.fn),
    phone: screen.getByPlaceholderText(placeholder.phone),
    password: screen.getByPlaceholderText(placeholder.password),
  });

  it("shows validation errors when inputs are blurred empty", async () => {
    setup();

    const placeholder = authContent.register.placeholders;
    const validations = validationMessages.register;

    const { username, email, atu, fn, phone, password } = getFields(placeholder);

    const allInputs = [username, email, atu, fn, phone, password];

    for (const input of allInputs) {
      await userEvent.click(input);
      await userEvent.tab();
    }

    expect(await screen.findByText(validations.username.invalid)).toBeInTheDocument();
    expect(await screen.findByText(validations.email.invalid)).toBeInTheDocument();
    expect(await screen.findByText(validations.atu.invalid)).toBeInTheDocument();
    expect(await screen.findByText(validations.fn.invalid)).toBeInTheDocument();
    expect(await screen.findByText(validations.phone.invalid)).toBeInTheDocument();

    for (const rule of Object.values(validations.password)) {
      expect(await screen.findByText(new RegExp(rule, "i"))).toBeInTheDocument();
    }
  });

  it("hides validation errors after entering valid values", async () => {
    setup();

    const placeholder = authContent.register.placeholders;
    const validations = validationMessages.register;

    const { username, email, atu, fn, phone, password } = getFields(placeholder);

    const allInputs = [username, email, atu, fn, phone, password];

    // Trigger all errors first
    for (const input of allInputs) {
      await userEvent.click(input);
      await userEvent.tab();
    }

    // Use your placeholders exactly as requested
    await userEvent.type(username, placeholder.username);
    await userEvent.tab();

    await userEvent.type(email, placeholder.email);
    await userEvent.tab();

    await userEvent.type(atu, placeholder.atu);
    await userEvent.tab();

    await userEvent.type(fn, placeholder.fn);
    await userEvent.tab();

    await userEvent.type(phone, placeholder.phone);
    await userEvent.tab();

    await userEvent.type(password, "Test2!"); // Password manually provided
    await userEvent.tab();

    // Expect errors to be gone (using waitFor for framer-motion exit)
    for (const key of ["username", "email", "atu", "fn", "phone"] as const) {
      await waitFor(() =>
        expect(
          screen.queryByText(validations[key].invalid)
        ).not.toBeInTheDocument()
      );
    }

    for (const rule of Object.values(validations.password)) {
      await waitFor(() =>
        expect(screen.queryByText(new RegExp(rule, "i"))).not.toBeInTheDocument()
      );
    }
  });

  it("keeps the register button disabled initially", () => {
    setup();

    const registerText = authContent.register.buttons.register;
    expect(screen.getByRole("button", { name: registerText })).toBeDisabled();
  });

  it("enables the register button when placeholder values are typed", async () => {
    setup();

    const placeholder = authContent.register.placeholders;
    const { username, email, atu, fn, phone, password } = getFields(placeholder);

    // EXACTLY how you want it
    await userEvent.type(username, placeholder.username);
    await userEvent.type(email, placeholder.email);
    await userEvent.type(atu, placeholder.atu);
    await userEvent.type(fn, placeholder.fn);
    await userEvent.type(phone, placeholder.phone);
    await userEvent.type(password, "John17!"); // password entered manually

    const registerText = authContent.register.buttons.register;

    expect(screen.getByRole("button", { name: registerText })).not.toBeDisabled();
  });

  it("toggles password visibility via test-id", async () => {
    setup();

    const placeholder = authContent.register.placeholders;
    const toggle = screen.getByTestId("password-toggle");
    const password = screen.getByPlaceholderText(placeholder.password);

    expect(password).toHaveAttribute("type", "password");

    await userEvent.click(toggle);
    expect(password).toHaveAttribute("type", "text");

    await userEvent.click(toggle);
    expect(password).toHaveAttribute("type", "password");
  });
});
