import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import HealthPage from "./HealthPage";

describe("HealthPage", () => {
  it("renders health page", () => {
    const queryClient = new QueryClient({
      defaultOptions: {
        queries: { retry: false },
      },
    });

    const { container } = render(
      <QueryClientProvider client={queryClient}>
        <HealthPage />
      </QueryClientProvider>,
    );

    expect(container).toBeTruthy();
  });
});
