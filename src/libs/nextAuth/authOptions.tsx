import type { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'

export const AuthOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Missing credentials");
        }
        console.log("credentials===>", credentials);

        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/auth/login`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(credentials),
          }
        );

        if (!res.ok) {
          const error = await res.json();
          throw new Error(error.message || "Login failed");
        }

        const data = await res.json();

        return {
          id: data.user.id,
          email: data.user.email,
          name: data.user.firstName + " " + data.user.lastName,
          role: data.user.role,
          accessToken: data.token,
        };
      },
    }),
  ],

  session: {
    strategy: "jwt",
  },

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.accessToken = (user as any).accessToken;
        token.role = (user as any).role;
        token.id = (user as any).id;
      }
      return token;
    },

    async session({ session, token }) {
      session.user = {
        ...session.user,
        id: token.id as string,
        role: token.role as string,
      };
      (session as any).accessToken = token.accessToken;
      return session;
    },
  },

  pages: {
    signIn: "/signin",
  },

  secret: process.env.NEXTAUTH_SECRET,
}
