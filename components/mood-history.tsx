'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { formatDistanceToNow } from 'date-fns'
import { Clock, MessageCircle } from 'lucide-react'

const moodConfig = [
  { value: 1, label: 'Struggling', bg: 'bg-mood-1', bgLight: 'bg-mood-1/15', emoji: '😢' },
  { value: 2, label: 'Low', bg: 'bg-mood-2', bgLight: 'bg-mood-2/15', emoji: '😔' },
  { value: 3, label: 'Neutral', bg: 'bg-mood-3', bgLight: 'bg-mood-3/15', emoji: '😐' },
  { value: 4, label: 'Good', bg: 'bg-mood-4', bgLight: 'bg-mood-4/15', emoji: '😊' },
  { value: 5, label: 'Thriving', bg: 'bg-mood-5', bgLight: 'bg-mood-5/15', emoji: '😄' },
]

interface MoodEntry {
  id: string
  mood: number
  note: string | null
  created_at: string
}

interface MoodHistoryProps {
  entries: MoodEntry[]
}

export function MoodHistory({ entries }: MoodHistoryProps) {
  if (entries.length === 0) {
    return (
      <Card className="border-border/50 shadow-sm">
        <CardHeader>
          <CardTitle className="text-foreground">Your Journey</CardTitle>
          <CardDescription className="text-muted-foreground">Recent mood entries will appear here</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-accent/50">
              <MessageCircle className="h-7 w-7 text-accent-foreground" />
            </div>
            <p className="text-muted-foreground">No mood entries yet</p>
            <p className="text-sm text-muted-foreground/70 mt-1">Start by logging your first mood above</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="border-border/50 shadow-sm">
      <CardHeader>
        <CardTitle className="text-foreground">Your Journey</CardTitle>
        <CardDescription className="text-muted-foreground">Your recent mood entries</CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        {entries.slice(0, 10).map((entry) => {
          const mood = moodConfig.find((m) => m.value === entry.mood)
          return (
            <div
              key={entry.id}
              className={`flex items-start gap-4 rounded-2xl ${mood?.bgLight} p-4 transition-colors`}
            >
              <div
                className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${mood?.bg}`}
              >
                <span className="text-xl">{mood?.emoji}</span>
              </div>
              <div className="flex-1 min-w-0 space-y-1">
                <div className="flex items-center justify-between gap-2">
                  <p className="font-medium text-foreground">{mood?.label}</p>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground shrink-0">
                    <Clock className="h-3 w-3" />
                    {formatDistanceToNow(new Date(entry.created_at), { addSuffix: true })}
                  </div>
                </div>
                {entry.note && (
                  <p className="text-sm text-muted-foreground line-clamp-2">{entry.note}</p>
                )}
              </div>
            </div>
          )
        })}
      </CardContent>
    </Card>
  )
}
