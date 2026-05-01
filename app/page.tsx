import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Sparkles, TrendingUp, Heart, Moon, Sun } from 'lucide-react'

export default function HomePage() {
  return (
    <div className="flex min-h-svh flex-col bg-background relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl -translate-y-1/2" />
      <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-accent/15 rounded-full blur-3xl translate-y-1/2" />
      <div className="absolute top-1/2 right-0 w-64 h-64 bg-secondary/20 rounded-full blur-2xl translate-x-1/2" />
      
      <header className="border-b border-border/40 backdrop-blur-md bg-background/60 sticky top-0 z-50">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-primary/70 shadow-lg shadow-primary/30">
              <Sparkles className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold text-foreground">MoodTrack</span>
          </div>
          <div className="flex gap-3">
            <Button variant="ghost" asChild className="text-muted-foreground hover:text-foreground hover:bg-secondary/50">
              <Link href="/auth/login">Sign in</Link>
            </Button>
            <Button asChild className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 shadow-lg shadow-primary/30 border-0">
              <Link href="/auth/sign-up">Get started</Link>
            </Button>
          </div>
        </div>
      </header>

      <main className="flex flex-1 flex-col items-center justify-center px-6 py-20 relative">
        <div className="mx-auto max-w-4xl text-center space-y-14">
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-secondary to-accent/30 px-5 py-2 text-sm font-medium text-secondary-foreground border border-border/50 shadow-sm">
              <Heart className="h-4 w-4 text-accent" />
              <span>Your emotional wellness companion</span>
            </div>
            <h1 className="text-5xl font-bold tracking-tight text-foreground sm:text-7xl text-balance leading-tight">
              Understand your emotions,{' '}
              <span className="bg-gradient-to-r from-primary via-primary/80 to-accent bg-clip-text text-transparent">one day at a time</span>
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto text-pretty">
              MoodTrack helps you build emotional awareness through simple daily check-ins. 
              Log your moods, reflect with notes, and discover patterns in your emotional journey.
            </p>
          </div>

          <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
            <Button size="lg" asChild className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 shadow-xl shadow-primary/30 h-14 px-10 text-base font-semibold border-0 rounded-2xl">
              <Link href="/auth/sign-up">Start your journey</Link>
            </Button>
            <Button size="lg" variant="outline" asChild className="h-14 px-10 text-base font-semibold border-border/60 hover:bg-secondary/50 rounded-2xl">
              <Link href="/auth/login">Sign in to your account</Link>
            </Button>
          </div>

          <div className="pt-6">
            <p className="text-sm text-muted-foreground mb-6">Track how you feel each day</p>
            <div className="flex justify-center gap-3 sm:gap-5">
              {[
                { emoji: '😢', label: 'Struggling', gradient: 'from-mood-1/25 to-mood-1/10', border: 'border-mood-1/40' },
                { emoji: '😔', label: 'Low', gradient: 'from-mood-2/25 to-mood-2/10', border: 'border-mood-2/40' },
                { emoji: '😐', label: 'Neutral', gradient: 'from-mood-3/25 to-mood-3/10', border: 'border-mood-3/40' },
                { emoji: '😊', label: 'Good', gradient: 'from-mood-4/25 to-mood-4/10', border: 'border-mood-4/40' },
                { emoji: '😄', label: 'Thriving', gradient: 'from-mood-5/25 to-mood-5/10', border: 'border-mood-5/40' },
              ].map((mood) => (
                <div
                  key={mood.label}
                  className={`flex flex-col items-center gap-2.5 rounded-3xl border-2 ${mood.border} bg-gradient-to-b ${mood.gradient} p-4 sm:p-5 transition-all duration-300 hover:scale-110 hover:shadow-lg cursor-pointer backdrop-blur-sm`}
                >
                  <span className="text-3xl sm:text-4xl drop-shadow-sm">{mood.emoji}</span>
                  <span className="text-xs sm:text-sm font-medium text-foreground/80">{mood.label}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="grid gap-6 pt-10 sm:grid-cols-3">
            <div className="group rounded-3xl border border-border/50 bg-card/80 backdrop-blur-sm p-7 text-left shadow-sm hover:shadow-xl hover:shadow-primary/10 transition-all duration-300 hover:-translate-y-1">
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 group-hover:from-primary/30 group-hover:to-primary/10 transition-colors">
                <Moon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-bold text-foreground mb-2 text-lg">Quick Check-ins</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">Log your mood in seconds with our simple, intuitive interface designed for daily reflection.</p>
            </div>
            <div className="group rounded-3xl border border-border/50 bg-card/80 backdrop-blur-sm p-7 text-left shadow-sm hover:shadow-xl hover:shadow-accent/10 transition-all duration-300 hover:-translate-y-1">
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-accent/30 to-accent/10 group-hover:from-accent/40 group-hover:to-accent/15 transition-colors">
                <Heart className="h-6 w-6 text-accent-foreground" />
              </div>
              <h3 className="font-bold text-foreground mb-2 text-lg">Personal Notes</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">Add context to your moods with private notes and reflections to better understand yourself.</p>
            </div>
            <div className="group rounded-3xl border border-border/50 bg-card/80 backdrop-blur-sm p-7 text-left shadow-sm hover:shadow-xl hover:shadow-secondary/20 transition-all duration-300 hover:-translate-y-1">
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-secondary to-secondary/60 group-hover:from-secondary/80 group-hover:to-secondary/50 transition-colors">
                <TrendingUp className="h-6 w-6 text-secondary-foreground" />
              </div>
              <h3 className="font-bold text-foreground mb-2 text-lg">Track Patterns</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">Visualize your emotional trends and gain valuable insights into your wellness journey.</p>
            </div>
          </div>
        </div>
      </main>

      <footer className="border-t border-border/40 py-8 backdrop-blur-sm bg-background/60">
        <p className="text-center text-sm text-muted-foreground">
          Build emotional awareness. Understand yourself better.
        </p>
      </footer>
    </div>
  )
}
