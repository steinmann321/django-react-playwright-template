import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { fetchHealthStatus } from "./api";

global.fetch = vi.fn();

describe("fetchHealthStatus", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.resetAllMocks();
  });

  it("fetches health status successfully", async () => {
    const mockResponse = {
      status: "healthy",
      service: "test",
      timestamp: "2024-01-01",
    };

    vi.mocked(fetch).mockResolvedValueOnce({
      ok: true,
      json: async () => mockResponse,
    } as Response);

    const result = await fetchHealthStatus();
    expect(result).toEqual(mockResponse);
    expect(fetch).toHaveBeenCalled();
  });

  it("throws error on failed request", async () => {
    vi.mocked(fetch).mockResolvedValueOnce({
      ok: false,
      status: 500,
    } as Response);

    await expect(fetchHealthStatus()).rejects.toThrow("Health API error: 500");
  });
});
