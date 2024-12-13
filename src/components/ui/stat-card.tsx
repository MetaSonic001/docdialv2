import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { cn } from '@/lib/utils'

interface StatCardProps {
  title: string
  value: string | number
  icon: React.ComponentType<{ className?: string }>
  change?: {
    value: number
    trend: 'up' | 'down'
  }
  className?: string
}

export function StatCard({ title, value, icon: Icon, change, className }: StatCardProps) {
  return (
    <Card className={cn('transition-all hover:shadow-md', className)}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <Icon className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {change && (
          <p className={cn(
            "text-xs",
            change.trend === 'up' ? "text-green-600" : "text-red-600"
          )}>
            {change.trend === 'up' ? '↑' : '↓'} {Math.abs(change.value)}%
          </p>
        )}
      </CardContent>
    </Card>
  )
}

