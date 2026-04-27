'use client'

import { useEffect, useState, useCallback } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { MoodSelector } from '@/components/mood-selector'
import { MoodHistory } from '@/components/mood-history'
import { MoodChart } from '@/components/mood-chart'

interface MoodEntry {
  id: string
  mood: number
  note: string | null
  created_at: string
}

export default function DashboardPage() {
  const [entries, setEntries] = useState<MoodEntry[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [userEmail, setUserEmail] = useState<string | null>(null)
  const router = useRouter()

  const fetchEntries = useCallback(async () => {
    const supabase = createClient()
    
    const { data, error } = await supabase
      .from('mood_entries')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(50)

    if (error) {
      console.log('[v0] Error fetching entries:', error.message)
    } else {
      setEntries(data || [])
    }
    setIsLoading(false)
  }, [])

  useEffect(() => {
    const checkUser = async () => {
      const supabase = createClient()
      const { data: { user } } = await supabase.auth.getUser()
      
      if (!user) {
        router.push('/auth/login')
        return
      }
      
      setUserEmail(user.email || null)
      fetchEntries()
    }

    checkUser()
  }, [router, fetchEntries])

  const handleSignOut = async () => {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push('/auth/login')
  }

  if (isLoading) {
    return (
      <div className="flex min-h-svh items-center justify-center bg-background">
        <p className="text-muted-foreground">Loading...</p>
      </div>
    )
  }

  return (
    <div className="min-h-svh bg-background">
      <header className="border-b">
        <div className="mx-auto flex max-w-4xl items-center justify-between px-4 py-4">
          <h1 className="text-xl font-bold text-foreground">MoodTrack</h1>
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground hidden sm:inline">
              {userEmail}
            </span>
            <Button variant="outline" size="sm" onClick={handleSignOut}>
              Sign out
            </Button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-4xl px-4 py-8">
        <div className="space-y-8">
          <MoodSelector onMoodLogged={fetchEntries} />
          <MoodChart entries={entries} />
          <MoodHistory entries={entries} />
        </div>
      </main>
    </div>
  )
}
