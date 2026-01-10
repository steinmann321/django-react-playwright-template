import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Textarea } from "./textarea";

describe("Textarea", () => {
  it("renders textarea", () => {
    render(<Textarea placeholder="Enter text" />);
    expect(screen.getByPlaceholderText("Enter text")).toBeInTheDocument();
  });

  it("can be disabled", () => {
    render(<Textarea disabled placeholder="Disabled" />);
    const textarea = screen.getByPlaceholderText("Disabled");
    expect(textarea).toBeDisabled();
  });
});
