import { AuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";

const authOptions: AuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!
    })
  ],
  pages: {
    signIn: "/Login",
    signOut: "/Login"
  },
  callbacks: {
    async session({ session, token }) {
      session.user.tag = session.user.name!
        .split(" ")
        .join("")
        .toLocaleLowerCase();

      session.user.uid = token.sub!;
      return session;
    },
  },
};

export default authOptions;
