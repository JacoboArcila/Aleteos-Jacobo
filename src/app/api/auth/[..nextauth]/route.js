import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import clientPromise from "../../../lib/mongodb";
import axios from "axios";

export default NextAuth({
  adapter: MongoDBAdapter(clientPromise),
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        try {
          // Call your existing Express API for authentication
          const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/login`, {
            email: credentials.email,
            password: credentials.password
          });
          
          // If no error and we have user data, return it
          if (res.data && res.data.user) {
            return {
              id: res.data.user._id,
              name: res.data.user.name,
              email: res.data.user.email,
              // Include additional user data as needed
              role: res.data.user.role,
              // Store the JWT token from your Express backend
              accessToken: res.data.token
            };
          }
          return null;
        } catch (error) {
          console.error("Auth error:", error);
          return null;
        }
      }
    }),
    // You can add more providers here (Google, GitHub, etc.)
    // GoogleProvider({
    //   clientId: process.env.GOOGLE_CLIENT_ID,
    //   clientSecret: process.env.GOOGLE_CLIENT_SECRET
    // }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  callbacks: {
    async jwt({ token, user }) {
      // When signing in, include the accessToken in the JWT
      if (user) {
        token.accessToken = user.accessToken;
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      // Make token info available in the client
      session.accessToken = token.accessToken;
      session.user.role = token.role;
      return session;
    }
  },
  pages: {
    signIn: '/auth/signin',   // Custom sign-in page
    signOut: '/auth/signout', // Custom sign-out page
    error: '/auth/error',     // Error page
  },
  secret: process.env.NEXTAUTH_SECRET,
  debug: process.env.NODE_ENV === 'development',
});