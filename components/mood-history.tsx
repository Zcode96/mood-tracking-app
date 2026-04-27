'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { formatDistanceToNow } from 'date-fns'

const moodConfig = [
  { value: 1, label: 'Terrible', color: 'bg-red-500', emoji: '😢' },
  { value: 2, label: 'Bad', color: 'bg-orange-500', emoji: '😔' },
  { value: 3, label: 'Okay', color: 'bg-yellow-500', emoji: '😐' },
  { value: 4, label: 'Good', color: 'bg-lime-500', emoji: '😊' },
  { value: 5, label: 'Great', color: 'bg-green-500', emoji: '😄' },
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
      <Card>
        <CardHeader>
          <CardTitle>Mood History</CardTitle>
          <CardDescription>Your recent mood entries will appear here</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-center text-muted-foreground py-8">
            No mood entries yet. Log your first mood above!
          </p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Mood History</CardTitle>
        <CardDescription>Your recent mood entries</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {entries.map((entry) => {
          const mood = moodConfig.find((m) => m.value === entry.mood)
          return (
            <div
              key={entry.id}
              className="flex items-start gap-4 rounded-lg border p-4"
            >
              <div
                className={`flex h-12 w-12 items-center justify-center rounded-full ${mood?.color}`}
              >
                <span className="text-xl">{mood?.emoji}</span>
              </div>
              <div className="flex-1 space-y-1">
                <div className="flex items-center justify-between">
                  <p className="font-medium">{mood?.label}</p>
                  <p className="text-sm text-muted-foreground">
                    {formatDistanceToNow(new Date(entry.created_at), { addSuffix: true })}
                  </p>
                </div>
                {entry.note && (
                  <p className="text-sm text-muted-foreground">{entry.note}</p>
                )}
              </div>
            </div>
          )
        })}
      </CardContent>
    </Card>
  )
}
