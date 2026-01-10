import HealthCheck from "../components/health/HealthCheck";

export default function HealthPage() {
  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Health</h1>
      <p className="mb-4 text-sm text-muted-foreground">
        Checks API status and displays example notice from backend.
      </p>
      <HealthCheck />
    </div>
  );
}
