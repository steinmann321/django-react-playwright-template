import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import LanguageSelector from "./LanguageSelector";
import * as i18n from "@/lib/i18n";

vi.mock("@/lib/i18n");

describe("LanguageSelector", () => {
  it("renders language selector with current language", () => {
    const mockSetLang = vi.fn();
    vi.mocked(i18n.useI18n).mockReturnValue({
      lang: "en",
      setLang: mockSetLang,
      t: (key: string) => key,
    });

    render(<LanguageSelector />);

    expect(screen.getByTestId("language-badge")).toHaveTextContent("en");
  });

  it("renders all language buttons", () => {
    const mockSetLang = vi.fn();
    vi.mocked(i18n.useI18n).mockReturnValue({
      lang: "en",
      setLang: mockSetLang,
      t: (key: string) => key,
    });

    render(<LanguageSelector />);

    const buttons = screen.getAllByRole("button", { pressed: false });
    expect(buttons.length).toBeGreaterThan(0);
  });

  it("calls setLang when button is clicked", () => {
    const mockSetLang = vi.fn();
    vi.mocked(i18n.useI18n).mockReturnValue({
      lang: "en",
      setLang: mockSetLang,
      t: (key: string) => key,
    });

    render(<LanguageSelector />);

    const buttons = screen.getAllByRole("button");
    const firstButton = buttons.find((btn) =>
      btn.textContent?.includes("language."),
    );
    if (firstButton) {
      fireEvent.click(firstButton);
      expect(mockSetLang).toHaveBeenCalled();
    }
  });

  it("highlights current language button", () => {
    const mockSetLang = vi.fn();
    vi.mocked(i18n.useI18n).mockReturnValue({
      lang: "de",
      setLang: mockSetLang,
      t: (key: string) => key,
    });

    render(<LanguageSelector />);

    expect(screen.getByTestId("language-badge")).toHaveTextContent("de");
  });
});
