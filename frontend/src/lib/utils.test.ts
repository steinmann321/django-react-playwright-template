import { describe, it, expect } from "vitest";
import { cn } from "./utils";

describe("cn", () => {
  it("merges class names correctly", () => {
    expect(cn("class1", "class2")).toBe("class1 class2");
  });

  it("handles conditional classes", () => {
    expect(cn("class1", false && "class2", "class3")).toBe("class1 class3");
  });

  it("handles undefined and null", () => {
    expect(cn("class1", undefined, null, "class2")).toBe("class1 class2");
  });
});
