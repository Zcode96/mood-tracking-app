import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Sparkles, TrendingUp, Heart } from 'lucide-react'

export default function HomePage() {
  return (
    <div className="flex min-h-svh flex-col bg-background">
      <header className="border-b border-border/50 backdrop-blur-sm bg-background/80 sticky top-0 z-50">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/10">
              <Sparkles className="h-5 w-5 text-primary" />
            </div>
            <span className="text-xl font-semibold text-foreground">MoodTrack</span>
          </div>
          <div className="flex gap-2">
            <Button variant="ghost" asChild className="text-muted-foreground hover:text-foreground">
              <Link href="/auth/login">Sign in</Link>
            </Button>
            <Button asChild className="bg-primary hover:bg-primary/90 shadow-lg shadow-primary/25">
              <Link href="/auth/sign-up">Get started</Link>
            </Button>
          </div>
        </div>
      </header>

      <main className="flex flex-1 flex-col items-center justify-center px-4 py-16">
        <div className="mx-auto max-w-3xl text-center space-y-12">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full bg-accent/50 px-4 py-1.5 text-sm text-accent-foreground">
              <Heart className="h-4 w-4" />
              <span>Your emotional wellness companion</span>
            </div>
            <h2 className="text-4xl font-bold tracking-tight text-foreground sm:text-6xl text-balance">
              Understand your emotions,{' '}
              <span className="text-primary">one day at a time</span>
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto text-pretty">
              MoodTrack helps you build emotional awareness through simple daily check-ins. 
              Log your moods, reflect with notes, and discover patterns in your emotional journey.
            </p>
          </div>

          <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
            <Button size="lg" asChild className="bg-primary hover:bg-primary/90 shadow-lg shadow-primary/25 h-12 px-8 text-base">
              <Link href="/auth/sign-up">Start your journey</Link>
            </Button>
            <Button size="lg" variant="outline" asChild className="h-12 px-8 text-base border-border/80">
              <Link href="/auth/login">Sign in to your account</Link>
            </Button>
          </div>

          <div className="pt-8">
            <div className="flex justify-center gap-4 sm:gap-6">
              {[
                { emoji: '😢', label: 'Struggling', bg: 'bg-mood-1/15', border: 'border-mood-1/30' },
                { emoji: '😔', label: 'Low', bg: 'bg-mood-2/15', border: 'border-mood-2/30' },
                { emoji: '😐', label: 'Neutral', bg: 'bg-mood-3/15', border: 'border-mood-3/30' },
                { emoji: '😊', label: 'Good', bg: 'bg-mood-4/15', border: 'border-mood-4/30' },
                { emoji: '😄', label: 'Thriving', bg: 'bg-mood-5/15', border: 'border-mood-5/30' },
              ].map((mood) => (
                <div
                  key={mood.label}
                  className={`flex flex-col items-center gap-2 rounded-2xl border ${mood.border} ${mood.bg} p-4 sm:p-5 transition-transform hover:scale-105`}
                >
                  <span className="text-3xl sm:text-4xl">{mood.emoji}</span>
                  <span className="text-xs sm:text-sm font-medium text-muted-foreground">{mood.label}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="grid gap-6 pt-8 sm:grid-cols-3">
            <div className="rounded-2xl border border-border/50 bg-card p-6 text-left shadow-sm">
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
                <Sparkles className="h-5 w-5 text-primary" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">Quick Check-ins</h3>
              <p className="text-sm text-muted-foreground">Log your mood in seconds with our simple, intuitive interface.</p>
            </div>
            <div className="rounded-2xl border border-border/50 bg-card p-6 text-left shadow-sm">
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-accent/50">
                <Heart className="h-5 w-5 text-accent-foreground" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">Personal Notes</h3>
              <p className="text-sm text-muted-foreground">Add context to your moods with private notes and reflections.</p>
            </div>
            <div className="rounded-2xl border border-border/50 bg-card p-6 text-left shadow-sm">
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-secondary">
                <TrendingUp className="h-5 w-5 text-secondary-foreground" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">Track Patterns</h3>
              <p className="text-sm text-muted-foreground">Visualize your emotional trends and gain valuable insights.</p>
            </div>
          </div>
        </div>
      </main>

      <footer className="border-t border-border/50 py-8">
        <p className="text-center text-sm text-muted-foreground">
          Build emotional awareness. Understand yourself better.
        </p>
      </footer>
    </div>
  )
}
