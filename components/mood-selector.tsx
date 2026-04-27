'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { createClient } from '@/lib/supabase/client'
import { Sparkles } from 'lucide-react'

const moods = [
  { value: 1, label: 'Struggling', bgSelected: 'bg-mood-1', bgUnselected: 'bg-mood-1/15 hover:bg-mood-1/25', emoji: '😢' },
  { value: 2, label: 'Low', bgSelected: 'bg-mood-2', bgUnselected: 'bg-mood-2/15 hover:bg-mood-2/25', emoji: '😔' },
  { value: 3, label: 'Neutral', bgSelected: 'bg-mood-3', bgUnselected: 'bg-mood-3/15 hover:bg-mood-3/25', emoji: '😐' },
  { value: 4, label: 'Good', bgSelected: 'bg-mood-4', bgUnselected: 'bg-mood-4/15 hover:bg-mood-4/25', emoji: '😊' },
  { value: 5, label: 'Thriving', bgSelected: 'bg-mood-5', bgUnselected: 'bg-mood-5/15 hover:bg-mood-5/25', emoji: '😄' },
]

interface MoodSelectorProps {
  onMoodLogged: () => void
}

export function MoodSelector({ onMoodLogged }: MoodSelectorProps) {
  const [selectedMood, setSelectedMood] = useState<number | null>(null)
  const [note, setNote] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async () => {
    if (!selectedMood) return

    setIsSubmitting(true)
    setError(null)

    const supabase = createClient()

    const { data: { user } } = await supabase.auth.getUser()
    
    if (!user) {
      setError('You must be logged in to log a mood')
      setIsSubmitting(false)
      return
    }

    const { error: insertError } = await supabase
      .from('mood_entries')
      .insert({
        user_id: user.id,
        mood: selectedMood,
        note: note.trim() || null,
      })

    if (insertError) {
      setError(insertError.message)
    } else {
      setSelectedMood(null)
      setNote('')
      onMoodLogged()
    }

    setIsSubmitting(false)
  }

  return (
    <Card className="border-border/50 shadow-lg shadow-primary/5 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 pointer-events-none" />
      <CardHeader className="relative">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
            <Sparkles className="h-5 w-5 text-primary" />
          </div>
          <div>
            <CardTitle className="text-foreground">How are you feeling?</CardTitle>
            <CardDescription className="text-muted-foreground">Take a moment to check in with yourself</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="relative space-y-6">
        <div className="flex justify-between gap-2 sm:gap-3">
          {moods.map((mood) => (
            <button
              key={mood.value}
              onClick={() => setSelectedMood(mood.value)}
              className={`flex flex-1 flex-col items-center gap-2 rounded-2xl p-3 sm:p-4 transition-all duration-200 ${
                selectedMood === mood.value
                  ? `${mood.bgSelected} text-white shadow-lg scale-105`
                  : `${mood.bgUnselected} text-foreground`
              }`}
            >
              <span className="text-2xl sm:text-3xl">{mood.emoji}</span>
              <span className="text-xs font-medium">{mood.label}</span>
            </button>
          ))}
        </div>

        <Textarea
          placeholder="What's on your mind? Add a note about how you're feeling... (optional)"
          value={note}
          onChange={(e) => setNote(e.target.value)}
          className="min-h-[100px] resize-none border-border/50 bg-background/50 focus:bg-background transition-colors"
        />

        {error && <p className="text-sm text-destructive">{error}</p>}

        <Button
          onClick={handleSubmit}
          disabled={!selectedMood || isSubmitting}
          className="w-full bg-primary hover:bg-primary/90 shadow-lg shadow-primary/25 h-11"
        >
          {isSubmitting ? 'Saving...' : 'Log your mood'}
        </Button>
      </CardContent>
    </Card>
  )
}
