'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'
import { format, subDays, startOfDay, isSameDay } from 'date-fns'

interface MoodEntry {
  id: string
  mood: number
  note: string | null
  created_at: string
}

interface MoodChartProps {
  entries: MoodEntry[]
}

const moodLabels = ['', 'Terrible', 'Bad', 'Okay', 'Good', 'Great']

export function MoodChart({ entries }: MoodChartProps) {
  // Create data for the last 7 days
  const last7Days = Array.from({ length: 7 }, (_, i) => {
    const date = startOfDay(subDays(new Date(), 6 - i))
    const dayEntries = entries.filter((e) =>
      isSameDay(new Date(e.created_at), date)
    )
    const avgMood =
      dayEntries.length > 0
        ? dayEntries.reduce((sum, e) => sum + e.mood, 0) / dayEntries.length
        : null

    return {
      date: format(date, 'EEE'),
      fullDate: format(date, 'MMM d'),
      mood: avgMood,
    }
  })

  const hasData = last7Days.some((d) => d.mood !== null)

  if (!hasData) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Weekly Trend</CardTitle>
          <CardDescription>Your mood pattern over the last 7 days</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-center text-muted-foreground py-8">
            Start logging moods to see your weekly trend!
          </p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Weekly Trend</CardTitle>
        <CardDescription>Your mood pattern over the last 7 days</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[200px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={last7Days}
              margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
            >
              <defs>
                <linearGradient id="moodGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(var(--chart-2))" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="hsl(var(--chart-2))" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis
                dataKey="date"
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }}
              />
              <YAxis
                domain={[1, 5]}
                ticks={[1, 2, 3, 4, 5]}
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }}
                tickFormatter={(value) => moodLabels[value]?.charAt(0) || ''}
              />
              <Tooltip
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    const data = payload[0].payload
                    return (
                      <div className="rounded-lg border bg-background p-2 shadow-sm">
                        <p className="text-sm font-medium">{data.fullDate}</p>
                        <p className="text-sm text-muted-foreground">
                          {data.mood ? moodLabels[Math.round(data.mood)] : 'No data'}
                        </p>
                      </div>
                    )
                  }
                  return null
                }}
              />
              <Area
                type="monotone"
                dataKey="mood"
                stroke="hsl(var(--chart-2))"
                strokeWidth={2}
                fill="url(#moodGradient)"
                connectNulls
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}
