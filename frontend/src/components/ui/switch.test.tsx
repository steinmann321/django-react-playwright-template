import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import { Switch } from "./switch";

describe("Switch", () => {
  it("renders switch", () => {
    const { container } = render(<Switch />);
    const switchEl = container.querySelector("button");
    expect(switchEl).toBeTruthy();
  });

  it("can be disabled", () => {
    const { container } = render(<Switch disabled />);
    const switchEl = container.querySelector("button");
    expect(switchEl).toBeDisabled();
  });
});
