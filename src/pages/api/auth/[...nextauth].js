import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { authenticateUser } from "../../../utils/auth"; // Adjust the import path as needed

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const user = await authenticateUser(credentials.username, credentials.password);
        if (user) {
          return user; // Return user object if authentication is successful
        }
        return null; // Return null if authentication fails
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.username = user.username;
      }
      return token;
    },
    async session({ session, token }) {
      session.user = { id: token.id, username: token.username };
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
});
