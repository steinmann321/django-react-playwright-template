import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./tooltip";

describe("Tooltip", () => {
  it("renders tooltip with trigger", () => {
    render(
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>Hover me</TooltipTrigger>
          <TooltipContent>Tooltip content</TooltipContent>
        </Tooltip>
      </TooltipProvider>,
    );

    expect(screen.getByText("Hover me")).toBeInTheDocument();
  });
});
