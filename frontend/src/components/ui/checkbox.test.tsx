import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import { Checkbox } from "./checkbox";

describe("Checkbox", () => {
  it("renders checkbox", () => {
    const { container } = render(<Checkbox />);
    const checkbox = container.querySelector("button");
    expect(checkbox).toBeTruthy();
  });

  it("can be disabled", () => {
    const { container } = render(<Checkbox disabled />);
    const checkbox = container.querySelector("button");
    expect(checkbox).toBeDisabled();
  });
});
