import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Sparkles, AlertCircle, ArrowLeft } from 'lucide-react'

export default function AuthErrorPage() {
  return (
    <div className="flex min-h-svh w-full items-center justify-center bg-background p-6 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-1/3 right-1/4 w-80 h-80 bg-destructive/8 rounded-full blur-3xl" />
      <div className="absolute bottom-1/3 left-1/4 w-96 h-96 bg-secondary/15 rounded-full blur-3xl" />
      
      <div className="w-full max-w-sm relative">
        <div className="flex flex-col gap-8">
          <div className="text-center">
            <Link href="/" className="inline-flex items-center gap-3 mb-5">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-primary/70 shadow-xl shadow-primary/30">
                <Sparkles className="h-6 w-6 text-primary-foreground" />
              </div>
              <span className="text-2xl font-bold text-foreground">MoodTrack</span>
            </Link>
          </div>
          <Card className="border-border/40 shadow-2xl shadow-destructive/5 backdrop-blur-sm bg-card/90 rounded-3xl">
            <CardHeader className="text-center pb-4">
              <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-3xl bg-gradient-to-br from-destructive/20 to-destructive/5">
                <AlertCircle className="h-8 w-8 text-destructive" />
              </div>
              <CardTitle className="text-2xl text-foreground">Authentication Error</CardTitle>
              <CardDescription className="text-muted-foreground leading-relaxed">
                Something went wrong during authentication. Please try again.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button asChild className="w-full bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 shadow-xl shadow-primary/30 h-12 text-base font-semibold rounded-2xl border-0">
                <Link href="/auth/login">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Login
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
