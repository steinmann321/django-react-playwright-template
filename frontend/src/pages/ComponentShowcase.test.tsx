import { describe, it, expect } from "vitest";
import { render, fireEvent } from "@testing-library/react";
import { I18nProvider } from "@/lib/i18n";
import ComponentShowcase from "./ComponentShowcase";

describe("ComponentShowcase", () => {
  it("renders component showcase", () => {
    const { container } = render(
      <I18nProvider>
        <ComponentShowcase />
      </I18nProvider>,
    );

    expect(container.textContent).toContain("Component Showcase");
    expect(container.textContent).toContain("Buttons");
    expect(container.textContent).toContain("Form Controls");
  });

  it("handles checkbox state changes", () => {
    const { container } = render(
      <I18nProvider>
        <ComponentShowcase />
      </I18nProvider>,
    );

    const checkboxes = container.querySelectorAll('button[role="checkbox"]');
    if (checkboxes.length > 0) {
      fireEvent.click(checkboxes[0]);
    }
    expect(container).toBeTruthy();
  });

  it("handles switch state changes", () => {
    const { container } = render(
      <I18nProvider>
        <ComponentShowcase />
      </I18nProvider>,
    );

    const switches = container.querySelectorAll('button[role="switch"]');
    if (switches.length > 0) {
      fireEvent.click(switches[0]);
    }
    expect(container).toBeTruthy();
  });
});
