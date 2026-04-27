import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function HomePage() {
  return (
    <div className="flex min-h-svh flex-col bg-background">
      <header className="border-b">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
          <h1 className="text-xl font-bold text-foreground">MoodTrack</h1>
          <div className="flex gap-2">
            <Button variant="ghost" asChild>
              <Link href="/auth/login">Sign in</Link>
            </Button>
            <Button asChild>
              <Link href="/auth/sign-up">Get started</Link>
            </Button>
          </div>
        </div>
      </header>

      <main className="flex flex-1 flex-col items-center justify-center px-4">
        <div className="mx-auto max-w-2xl text-center space-y-8">
          <div className="space-y-4">
            <h2 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
              Track your emotional wellness
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              MoodTrack helps you understand your emotions better. Log your daily moods,
              add notes, and visualize your emotional patterns over time.
            </p>
          </div>

          <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
            <Button size="lg" asChild>
              <Link href="/auth/sign-up">Start tracking for free</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/auth/login">Sign in to your account</Link>
            </Button>
          </div>

          <div className="flex justify-center gap-8 pt-8">
            <div className="flex flex-col items-center gap-2 rounded-xl p-4 bg-red-500/10">
              <span className="text-3xl">😢</span>
              <span className="text-sm text-muted-foreground">Terrible</span>
            </div>
            <div className="flex flex-col items-center gap-2 rounded-xl p-4 bg-orange-500/10">
              <span className="text-3xl">😔</span>
              <span className="text-sm text-muted-foreground">Bad</span>
            </div>
            <div className="flex flex-col items-center gap-2 rounded-xl p-4 bg-yellow-500/10">
              <span className="text-3xl">😐</span>
              <span className="text-sm text-muted-foreground">Okay</span>
            </div>
            <div className="flex flex-col items-center gap-2 rounded-xl p-4 bg-lime-500/10">
              <span className="text-3xl">😊</span>
              <span className="text-sm text-muted-foreground">Good</span>
            </div>
            <div className="flex flex-col items-center gap-2 rounded-xl p-4 bg-green-500/10">
              <span className="text-3xl">😄</span>
              <span className="text-sm text-muted-foreground">Great</span>
            </div>
          </div>
        </div>
      </main>

      <footer className="border-t py-6">
        <p className="text-center text-sm text-muted-foreground">
          Track your mood. Understand yourself better.
        </p>
      </footer>
    </div>
  )
}
