'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'
import { format, subDays, startOfDay, isSameDay } from 'date-fns'
import { TrendingUp, BarChart3 } from 'lucide-react'

interface MoodEntry {
  id: string
  mood: number
  note: string | null
  created_at: string
}

interface MoodChartProps {
  entries: MoodEntry[]
}

const moodLabels = ['', 'Struggling', 'Low', 'Neutral', 'Good', 'Thriving']
const moodEmojis = ['', '😢', '😔', '😐', '😊', '😄']

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
      <Card className="border-border/50 shadow-sm">
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent/50">
              <TrendingUp className="h-5 w-5 text-accent-foreground" />
            </div>
            <div>
              <CardTitle className="text-foreground">Weekly Insights</CardTitle>
              <CardDescription className="text-muted-foreground">Your mood pattern over the last 7 days</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-secondary">
              <BarChart3 className="h-7 w-7 text-secondary-foreground" />
            </div>
            <p className="text-muted-foreground">No data yet</p>
            <p className="text-sm text-muted-foreground/70 mt-1">Start logging moods to see your weekly trend</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="border-border/50 shadow-sm overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-transparent to-primary/5 pointer-events-none" />
      <CardHeader className="relative">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent/50">
            <TrendingUp className="h-5 w-5 text-accent-foreground" />
          </div>
          <div>
            <CardTitle className="text-foreground">Weekly Insights</CardTitle>
            <CardDescription className="text-muted-foreground">Your mood pattern over the last 7 days</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="relative">
        <div className="h-[220px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={last7Days}
              margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
            >
              <defs>
                <linearGradient id="moodGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="oklch(0.65 0.15 195)" stopOpacity={0.4} />
                  <stop offset="50%" stopColor="oklch(0.80 0.12 290)" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="oklch(0.80 0.12 290)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis
                dataKey="date"
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12, fill: 'oklch(0.50 0.03 280)' }}
              />
              <YAxis
                domain={[1, 5]}
                ticks={[1, 2, 3, 4, 5]}
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12, fill: 'oklch(0.50 0.03 280)' }}
                tickFormatter={(value) => moodEmojis[value] || ''}
              />
              <Tooltip
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    const data = payload[0].payload
                    const moodValue = Math.round(data.mood)
                    return (
                      <div className="rounded-xl border border-border/50 bg-card p-3 shadow-lg">
                        <p className="text-sm font-medium text-foreground">{data.fullDate}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-lg">{moodEmojis[moodValue]}</span>
                          <span className="text-sm text-muted-foreground">
                            {data.mood ? moodLabels[moodValue] : 'No data'}
                          </span>
                        </div>
                      </div>
                    )
                  }
                  return null
                }}
              />
              <Area
                type="monotone"
                dataKey="mood"
                stroke="oklch(0.65 0.15 195)"
                strokeWidth={3}
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
