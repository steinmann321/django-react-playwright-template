import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import HealthCheck from "./HealthCheck";
import * as api from "@/lib/api";

vi.mock("@/lib/api");

describe("HealthCheck", () => {
  let queryClient: QueryClient;

  beforeEach(() => {
    queryClient = new QueryClient({
      defaultOptions: {
        queries: { retry: false },
      },
    });
    vi.clearAllMocks();
  });

  it("renders loading state initially", () => {
    vi.mocked(api.fetchHealthStatus).mockImplementation(
      () => new Promise(() => {}),
    );

    render(
      <QueryClientProvider client={queryClient}>
        <HealthCheck />
      </QueryClientProvider>,
    );

    expect(screen.getByText("Loading health status...")).toBeInTheDocument();
  });

  it("renders healthy status", async () => {
    vi.mocked(api.fetchHealthStatus).mockResolvedValue({
      status: "healthy",
      service: "test-service",
      timestamp: "2024-01-01T00:00:00Z",
    });

    render(
      <QueryClientProvider client={queryClient}>
        <HealthCheck />
      </QueryClientProvider>,
    );

    await waitFor(() => {
      expect(screen.getByText("Healthy")).toBeInTheDocument();
    });
    expect(screen.getByText("test-service")).toBeInTheDocument();
  });

  it("renders error state", async () => {
    const errorMessage = "Network error";
    vi.mocked(api.fetchHealthStatus).mockRejectedValue(new Error(errorMessage));

    render(
      <QueryClientProvider client={queryClient}>
        <HealthCheck />
      </QueryClientProvider>,
    );

    await waitFor(() => {
      expect(screen.getByTestId("health-error")).toBeInTheDocument();
    });
    expect(screen.getByText(errorMessage)).toBeInTheDocument();
  });

  it("renders unhealthy status", async () => {
    vi.mocked(api.fetchHealthStatus).mockResolvedValue({
      status: "unhealthy",
      service: "test-service",
      timestamp: "2024-01-01T00:00:00Z",
    });

    render(
      <QueryClientProvider client={queryClient}>
        <HealthCheck />
      </QueryClientProvider>,
    );

    await waitFor(() => {
      expect(screen.getByText("Unhealthy")).toBeInTheDocument();
    });
  });

  it("renders example info when available", async () => {
    vi.mocked(api.fetchHealthStatus).mockResolvedValue({
      status: "healthy",
      service: "test-service",
      timestamp: "2024-01-01T00:00:00Z",
      examples: [{ info: "Example info text" }],
    });

    render(
      <QueryClientProvider client={queryClient}>
        <HealthCheck />
      </QueryClientProvider>,
    );

    await waitFor(() => {
      expect(screen.getByTestId("health-example")).toHaveTextContent(
        "Example info text",
      );
    });
  });
});
