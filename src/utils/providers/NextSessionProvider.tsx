'use client'
import type { ReactNode } from 'react'
import { SessionProvider } from 'next-auth/react'
import type { Session } from 'next-auth'

export function NextSessionProvider({
  children,
  session
}: {
  children: ReactNode
  session?: Session | null
}) {
  // you can also set options: refetchInterval, refetchOnWindowFocus, etc.
  return <SessionProvider session={session}>{children}</SessionProvider>
}