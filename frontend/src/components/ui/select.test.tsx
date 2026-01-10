import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./select";

describe("Select", () => {
  it("renders select component", () => {
    render(
      <Select>
        <SelectTrigger>
          <SelectValue placeholder="Select option" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="option1">Option 1</SelectItem>
          <SelectItem value="option2">Option 2</SelectItem>
        </SelectContent>
      </Select>,
    );

    expect(screen.getByText("Select option")).toBeInTheDocument();
  });

  it("renders select with multiple items", () => {
    render(
      <Select>
        <SelectTrigger>
          <SelectValue placeholder="Choose" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="a">A</SelectItem>
          <SelectItem value="b">B</SelectItem>
          <SelectItem value="c">C</SelectItem>
        </SelectContent>
      </Select>,
    );

    expect(screen.getByText("Choose")).toBeInTheDocument();
  });
});
