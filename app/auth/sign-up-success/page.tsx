import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Sparkles, Mail, ArrowRight } from 'lucide-react'

export default function SignUpSuccessPage() {
  return (
    <div className="flex min-h-svh w-full items-center justify-center bg-background p-6">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/10 pointer-events-none" />
      <div className="w-full max-w-sm relative">
        <div className="flex flex-col gap-6">
          <div className="text-center">
            <Link href="/" className="inline-flex items-center gap-2 mb-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
                <Sparkles className="h-5 w-5 text-primary" />
              </div>
              <span className="text-2xl font-bold text-foreground">MoodTrack</span>
            </Link>
          </div>
          <Card className="border-border/50 shadow-xl shadow-primary/5">
            <CardHeader className="text-center">
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-accent/50">
                <Mail className="h-7 w-7 text-accent-foreground" />
              </div>
              <CardTitle className="text-2xl text-foreground">Check your email</CardTitle>
              <CardDescription className="text-muted-foreground">
                We sent you a confirmation link. Please check your inbox to verify your account.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button asChild className="w-full bg-primary hover:bg-primary/90 shadow-lg shadow-primary/25 h-11">
                <Link href="/auth/login">
                  Continue to sign in
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
