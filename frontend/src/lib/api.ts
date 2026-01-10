const API_BASE_URL: string =
  (import.meta as any).env?.VITE_API_URL || "http://localhost:8000";

export async function fetchHealthStatus() {
  const res = await fetch(`${API_BASE_URL}/api/health/`);
  if (!res.ok) throw new Error(`Health API error: ${res.status}`);
  return res.json();
}
