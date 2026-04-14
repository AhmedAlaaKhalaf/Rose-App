import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { loginResponse } from "./lib/types/auth";
// NextAuth configuration options
export const authOptions: NextAuthOptions = {
  // Custom pages for authentication flow
  pages: {
    signIn: "/auth/login",
    newUser: "/auth/register",
    signOut: "/auth/login",
    error: "/auth/login",
  },
  // Session configuration - 30 days for persistent sessions
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  // Authentication providers
  providers: [
    CredentialsProvider({
      id: "login",
      name: "login",
      credentials: {
        username: {},
        password: {},
        rememberMe: {},
      },
      // Function to authorize credentials and return user object
      async authorize(credentials) {
        const data = {
          username: credentials?.username,
          password: credentials?.password,
        };

        // Call backend API for login
        const res = await fetch(`${process.env.NEXT_PUBLIC_API}/auth/login`, {
          method: "POST",
          body: JSON.stringify(data),
          headers: { "Content-Type": "application/json" },
        });

        // Parse API response
        const payload: ApiResponse<loginResponse> = await res.json();

        // Throw error if authentication fails
        if ("message" in payload) throw new Error(payload.message);

        // Return user object to NextAuth
        return {
          id: payload.payload.user.id,
          accessToken: payload.payload.token,
          user: payload.payload.user,
          rememberMe: credentials?.rememberMe === "true",
        };
      },
    }),
  ],

  // Callbacks for customizing JWT and session handling
  callbacks: {
    // Modify JWT token after login
    async jwt({ token, user }) {
      if (user) {
        token.accessToken = user.accessToken;
        token.user = user.user;
        token.rememberMe = user.rememberMe;
      }
      return token;
    },

    // Modify session object sent to the client
    async session({ session, token }) {
      session.accessToken = token.accessToken as string;
      session.user = token.user;
      return session;
    },
  },
};

export default NextAuth(authOptions);
