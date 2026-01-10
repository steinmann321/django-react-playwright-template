import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Label } from "./label";

describe("Label", () => {
  it("renders label with text", () => {
    render(<Label>Test Label</Label>);
    expect(screen.getByText("Test Label")).toBeInTheDocument();
  });

  it("accepts htmlFor prop", () => {
    render(<Label htmlFor="test-input">Label</Label>);
    const label = screen.getByText("Label");
    expect(label).toHaveAttribute("for", "test-input");
  });
});
