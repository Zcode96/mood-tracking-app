'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { formatDistanceToNow } from 'date-fns'
import { Clock, MessageCircle, Scroll } from 'lucide-react'

const moodConfig = [
  { value: 1, label: 'Struggling', bg: 'bg-mood-1', bgLight: 'bg-gradient-to-r from-mood-1/15 to-mood-1/5', emoji: '😢' },
  { value: 2, label: 'Low', bg: 'bg-mood-2', bgLight: 'bg-gradient-to-r from-mood-2/15 to-mood-2/5', emoji: '😔' },
  { value: 3, label: 'Neutral', bg: 'bg-mood-3', bgLight: 'bg-gradient-to-r from-mood-3/15 to-mood-3/5', emoji: '😐' },
  { value: 4, label: 'Good', bg: 'bg-mood-4', bgLight: 'bg-gradient-to-r from-mood-4/15 to-mood-4/5', emoji: '😊' },
  { value: 5, label: 'Thriving', bg: 'bg-mood-5', bgLight: 'bg-gradient-to-r from-mood-5/15 to-mood-5/5', emoji: '😄' },
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
      <Card className="border-border/40 shadow-lg shadow-accent/5 backdrop-blur-sm bg-card/90 rounded-3xl">
        <CardHeader>
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-accent/40 to-accent/20">
              <Scroll className="h-6 w-6 text-accent-foreground" />
            </div>
            <div>
              <CardTitle className="text-foreground text-xl">Your Journey</CardTitle>
              <CardDescription className="text-muted-foreground">Recent mood entries will appear here</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center py-14 text-center">
            <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-3xl bg-gradient-to-br from-secondary to-secondary/60">
              <MessageCircle className="h-8 w-8 text-secondary-foreground" />
            </div>
            <p className="text-foreground font-medium">No mood entries yet</p>
            <p className="text-sm text-muted-foreground mt-1">Start by logging your first mood above</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="border-border/40 shadow-lg shadow-accent/5 backdrop-blur-sm bg-card/90 rounded-3xl">
      <CardHeader>
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-accent/40 to-accent/20">
            <Scroll className="h-6 w-6 text-accent-foreground" />
          </div>
          <div>
            <CardTitle className="text-foreground text-xl">Your Journey</CardTitle>
            <CardDescription className="text-muted-foreground">Your recent mood entries</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        {entries.slice(0, 8).map((entry) => {
          const mood = moodConfig.find((m) => m.value === entry.mood)
          return (
            <div
              key={entry.id}
              className={`flex items-start gap-4 rounded-2xl ${mood?.bgLight} p-4 transition-all duration-200 hover:shadow-md border border-transparent hover:border-border/30`}
            >
              <div
                className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${mood?.bg} shadow-sm`}
              >
                <span className="text-xl drop-shadow-sm">{mood?.emoji}</span>
              </div>
              <div className="flex-1 min-w-0 space-y-1">
                <div className="flex items-center justify-between gap-2">
                  <p className="font-semibold text-foreground">{mood?.label}</p>
                  <div className="flex items-center gap-1.5 text-xs text-muted-foreground shrink-0 bg-background/50 rounded-full px-2 py-1">
                    <Clock className="h-3 w-3" />
                    {formatDistanceToNow(new Date(entry.created_at), { addSuffix: true })}
                  </div>
                </div>
                {entry.note && (
                  <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">{entry.note}</p>
                )}
              </div>
            </div>
          )
        })}
      </CardContent>
    </Card>
  )
}
