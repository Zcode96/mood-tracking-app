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
      <div className="flex min-h-svh items-center justify-center bg-background relative overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-accent/15 rounded-full blur-3xl" />
        <div className="flex flex-col items-center gap-5 relative">
          <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-gradient-to-br from-primary to-primary/70 shadow-xl shadow-primary/30 animate-pulse">
            <Sparkles className="h-8 w-8 text-primary-foreground" />
          </div>
          <p className="text-muted-foreground font-medium">Loading your journey...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-svh bg-background relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="fixed top-0 left-1/3 w-96 h-96 bg-primary/8 rounded-full blur-3xl -translate-y-1/2 pointer-events-none" />
      <div className="fixed bottom-0 right-1/4 w-80 h-80 bg-accent/10 rounded-full blur-3xl translate-y-1/2 pointer-events-none" />
      
      <header className="border-b border-border/40 backdrop-blur-md bg-background/70 sticky top-0 z-50">
        <div className="mx-auto flex max-w-4xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-primary/70 shadow-lg shadow-primary/30">
              <Sparkles className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold text-foreground">MoodTrack</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-2 text-sm text-muted-foreground bg-secondary/60 backdrop-blur-sm rounded-full px-4 py-2 border border-border/40">
              <User className="h-3.5 w-3.5" />
              <span className="max-w-[150px] truncate">{userEmail}</span>
            </div>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handleSignOut}
              className="border-border/50 hover:bg-destructive/10 hover:text-destructive hover:border-destructive/40 rounded-xl"
            >
              <LogOut className="h-4 w-4 mr-2" />
              Sign out
            </Button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-4xl px-6 py-10 relative">
        <div className="mb-10">
          <h1 className="text-3xl font-bold text-foreground">Welcome back</h1>
          <p className="text-muted-foreground mt-2 text-lg">Take a moment to reflect on how you&apos;re feeling today.</p>
        </div>
        <div className="space-y-8">
          <MoodSelector onMoodLogged={fetchEntries} />
          <div className="grid gap-8 lg:grid-cols-2">
            <MoodChart entries={entries} />
            <MoodHistory entries={entries} />
          </div>
        </div>
      </main>
    </div>
  )
}
