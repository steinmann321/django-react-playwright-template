import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter } from "react-router-dom";
import { I18nProvider } from "@/lib/i18n";
import App from "./App";

describe("App", () => {
  it("renders app component", () => {
    const queryClient = new QueryClient({
      defaultOptions: {
        queries: { retry: false },
      },
    });

    render(
      <BrowserRouter>
        <I18nProvider>
          <QueryClientProvider client={queryClient}>
            <App />
          </QueryClientProvider>
        </I18nProvider>
      </BrowserRouter>,
    );

    expect(document.body).toBeTruthy();
  });
});
