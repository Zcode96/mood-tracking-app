'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { createClient } from '@/lib/supabase/client'
import { Sparkles } from 'lucide-react'

const moods = [
  { value: 1, label: 'Struggling', bgSelected: 'bg-mood-1', bgUnselected: 'bg-gradient-to-b from-mood-1/20 to-mood-1/5 hover:from-mood-1/30 hover:to-mood-1/10', border: 'border-mood-1/40', emoji: '😢' },
  { value: 2, label: 'Low', bgSelected: 'bg-mood-2', bgUnselected: 'bg-gradient-to-b from-mood-2/20 to-mood-2/5 hover:from-mood-2/30 hover:to-mood-2/10', border: 'border-mood-2/40', emoji: '😔' },
  { value: 3, label: 'Neutral', bgSelected: 'bg-mood-3', bgUnselected: 'bg-gradient-to-b from-mood-3/20 to-mood-3/5 hover:from-mood-3/30 hover:to-mood-3/10', border: 'border-mood-3/40', emoji: '😐' },
  { value: 4, label: 'Good', bgSelected: 'bg-mood-4', bgUnselected: 'bg-gradient-to-b from-mood-4/20 to-mood-4/5 hover:from-mood-4/30 hover:to-mood-4/10', border: 'border-mood-4/40', emoji: '😊' },
  { value: 5, label: 'Thriving', bgSelected: 'bg-mood-5', bgUnselected: 'bg-gradient-to-b from-mood-5/20 to-mood-5/5 hover:from-mood-5/30 hover:to-mood-5/10', border: 'border-mood-5/40', emoji: '😄' },
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
    <Card className="border-border/40 shadow-xl shadow-primary/5 overflow-hidden backdrop-blur-sm bg-card/90 rounded-3xl">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/8 pointer-events-none" />
      <CardHeader className="relative pb-4">
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-primary/70 shadow-lg shadow-primary/30">
            <Sparkles className="h-6 w-6 text-primary-foreground" />
          </div>
          <div>
            <CardTitle className="text-foreground text-xl">How are you feeling?</CardTitle>
            <CardDescription className="text-muted-foreground">Take a moment to check in with yourself</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="relative space-y-6">
        <div className="flex justify-between gap-2 sm:gap-4">
          {moods.map((mood) => (
            <button
              key={mood.value}
              onClick={() => setSelectedMood(mood.value)}
              className={`flex flex-1 flex-col items-center gap-2.5 rounded-2xl p-3 sm:p-4 transition-all duration-300 border-2 ${
                selectedMood === mood.value
                  ? `${mood.bgSelected} text-white shadow-xl scale-105 border-transparent`
                  : `${mood.bgUnselected} ${mood.border} text-foreground backdrop-blur-sm`
              }`}
            >
              <span className="text-2xl sm:text-3xl drop-shadow-sm">{mood.emoji}</span>
              <span className="text-xs font-semibold">{mood.label}</span>
            </button>
          ))}
        </div>

        <Textarea
          placeholder="What's on your mind? Add a note about how you're feeling... (optional)"
          value={note}
          onChange={(e) => setNote(e.target.value)}
          className="min-h-[110px] resize-none border-border/50 bg-background/60 focus:bg-background transition-all rounded-2xl placeholder:text-muted-foreground/60"
        />

        {error && <p className="text-sm text-destructive font-medium">{error}</p>}

        <Button
          onClick={handleSubmit}
          disabled={!selectedMood || isSubmitting}
          className="w-full bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 shadow-xl shadow-primary/30 h-12 text-base font-semibold rounded-2xl border-0"
        >
          {isSubmitting ? 'Saving...' : 'Log your mood'}
        </Button>
      </CardContent>
    </Card>
  )
}
