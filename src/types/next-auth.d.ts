/* eslint-disable @typescript-eslint/no-unused-vars */
import type { DefaultSession, DefaultUser } from 'next-auth';
import NextAuth from 'next-auth'
import { JWT as DefaultJWT } from 'next-auth/jwt'

declare module 'next-auth' {

    // Extend User type
    interface User extends DefaultUser {
        id: string
        role?: string
        email?: string
        accessToken?: string
    }

    // Extend Session type
    interface Session {
        user: {
            id: string
            role?: string
            email?: string
            accessToken?: string
        } & DefaultSession['user']
        accessToken?: string

    }
}

declare module 'next-auth/jwt' {
    interface JWT {
        id: string
        role?: string
        email?: string
        accessToken?: string
    }
}
