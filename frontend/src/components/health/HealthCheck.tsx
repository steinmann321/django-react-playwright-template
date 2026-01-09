import { useQuery } from '@tanstack/react-query'
import { fetchHealthStatus } from '../../lib/api'
import { Card, CardHeader, CardTitle, CardContent } from '../../ui/card'
import { Badge } from '../../ui/badge'
import { Alert, AlertTitle, AlertDescription } from '../../ui/alert'

export default function HealthCheck() {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['health'],
    queryFn: fetchHealthStatus,
    refetchInterval: 5000,
  })

  if (isLoading) return <div>Loading health status...</div>
  if (isError) return (
    <Alert data-testid="health-error">
      <AlertTitle>Error</AlertTitle>
      <AlertDescription>{(error as Error).message}</AlertDescription>
    </Alert>
  )

  const healthy = data.status === 'healthy'

  return (
    <Card data-testid="health-card">
      <CardHeader>
        <CardTitle>Backend Health</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-3">
          <Badge variant={healthy ? 'success' : 'destructive'}>
            {healthy ? 'Healthy' : 'Unhealthy'}
          </Badge>
          <span className="text-sm text-gray-500">{data.service}</span>
        </div>
        <div className="mt-2 text-sm">Timestamp: {data.timestamp}</div>
        {data.examples?.[0]?.info && (
          <p className="mt-4 text-sm" data-testid="health-example">{data.examples[0].info}</p>
        )}
      </CardContent>
    </Card>
  )
}
