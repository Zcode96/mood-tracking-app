'use client'

import { useEffect, useState, useCallback } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { MoodSelector } from '@/components/mood-selector'
import { MoodHistory } from '@/components/mood-history'
import { MoodChart } from '@/components/mood-chart'
import { Sparkles, LogOut, User } from 'lucide-react'

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
        <div className="flex flex-col items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 animate-pulse">
            <Sparkles className="h-6 w-6 text-primary" />
          </div>
          <p className="text-muted-foreground">Loading your journey...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-svh bg-background">
      <header className="border-b border-border/50 backdrop-blur-sm bg-background/80 sticky top-0 z-50">
        <div className="mx-auto flex max-w-4xl items-center justify-between px-4 py-4">
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/10">
              <Sparkles className="h-5 w-5 text-primary" />
            </div>
            <span className="text-xl font-semibold text-foreground">MoodTrack</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-2 text-sm text-muted-foreground bg-secondary/50 rounded-full px-3 py-1.5">
              <User className="h-3.5 w-3.5" />
              <span className="max-w-[150px] truncate">{userEmail}</span>
            </div>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handleSignOut}
              className="border-border/50 hover:bg-destructive/10 hover:text-destructive hover:border-destructive/30"
            >
              <LogOut className="h-4 w-4 mr-2" />
              Sign out
            </Button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-4xl px-4 py-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-foreground">Welcome back</h1>
          <p className="text-muted-foreground mt-1">Take a moment to reflect on how you&apos;re feeling today.</p>
        </div>
        <div className="space-y-6">
          <MoodSelector onMoodLogged={fetchEntries} />
          <div className="grid gap-6 lg:grid-cols-2">
            <MoodChart entries={entries} />
            <MoodHistory entries={entries} />
          </div>
        </div>
      </main>
    </div>
  )
}
