'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { createClient } from '@/lib/supabase/client'

const moods = [
  { value: 1, label: 'Terrible', color: 'bg-red-500', emoji: '😢' },
  { value: 2, label: 'Bad', color: 'bg-orange-500', emoji: '😔' },
  { value: 3, label: 'Okay', color: 'bg-yellow-500', emoji: '😐' },
  { value: 4, label: 'Good', color: 'bg-lime-500', emoji: '😊' },
  { value: 5, label: 'Great', color: 'bg-green-500', emoji: '😄' },
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
    <Card>
      <CardHeader>
        <CardTitle>How are you feeling?</CardTitle>
        <CardDescription>Select your current mood and add an optional note</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex justify-between gap-2">
          {moods.map((mood) => (
            <button
              key={mood.value}
              onClick={() => setSelectedMood(mood.value)}
              className={`flex flex-col items-center gap-2 rounded-xl p-3 transition-all hover:scale-105 ${
                selectedMood === mood.value
                  ? `${mood.color} text-white shadow-lg scale-105`
                  : 'bg-muted hover:bg-muted/80'
              }`}
            >
              <span className="text-2xl">{mood.emoji}</span>
              <span className="text-xs font-medium">{mood.label}</span>
            </button>
          ))}
        </div>

        <Textarea
          placeholder="Add a note about how you're feeling... (optional)"
          value={note}
          onChange={(e) => setNote(e.target.value)}
          className="min-h-[100px] resize-none"
        />

        {error && <p className="text-sm text-destructive">{error}</p>}

        <Button
          onClick={handleSubmit}
          disabled={!selectedMood || isSubmitting}
          className="w-full"
        >
          {isSubmitting ? 'Logging...' : 'Log Mood'}
        </Button>
      </CardContent>
    </Card>
  )
}
