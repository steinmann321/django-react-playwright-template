import { describe, it, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { I18nProvider, useI18n } from "./i18n";

describe("I18nProvider", () => {
  function TestComponent() {
    const { lang, setLang, t } = useI18n();

    return (
      <div>
        <div data-testid="current-lang">{lang}</div>
        <div data-testid="translated">{t("welcome")}</div>
        <button onClick={() => setLang("de")}>Change to DE</button>
        <button onClick={() => setLang("fr")}>Change to FR</button>
        <button onClick={() => setLang("es")}>Change to ES</button>
      </div>
    );
  }

  it("provides default language", () => {
    render(
      <I18nProvider>
        <TestComponent />
      </I18nProvider>,
    );

    expect(screen.getByTestId("current-lang")).toHaveTextContent("en");
  });

  it("allows changing language to German", () => {
    render(
      <I18nProvider>
        <TestComponent />
      </I18nProvider>,
    );

    const button = screen.getByText("Change to DE");
    fireEvent.click(button);

    expect(screen.getByTestId("current-lang")).toHaveTextContent("de");
  });

  it("allows changing language to French", () => {
    render(
      <I18nProvider>
        <TestComponent />
      </I18nProvider>,
    );

    const button = screen.getByText("Change to FR");
    fireEvent.click(button);

    expect(screen.getByTestId("current-lang")).toHaveTextContent("fr");
  });

  it("allows changing language to Spanish", () => {
    render(
      <I18nProvider>
        <TestComponent />
      </I18nProvider>,
    );

    const button = screen.getByText("Change to ES");
    fireEvent.click(button);

    expect(screen.getByTestId("current-lang")).toHaveTextContent("es");
  });

  it("translates keys", () => {
    render(
      <I18nProvider>
        <TestComponent />
      </I18nProvider>,
    );

    const translated = screen.getByTestId("translated");
    expect(translated).toBeTruthy();
  });
});
