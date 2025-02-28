import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials";

const handler = NextAuth({
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize() {
        const user = {
          id: "1",
          username: "pepito",
          email: "pepito@gmail.com"
        }
        return user;
      },

    }),
  ],
  callbacks: {
    jwt: async ({ token, user, account, profile, trigger, isNewUser, session }) => {
        console.log("jwt", token, user, account, profile, trigger, isNewUser, session);
      if (user) {
        token.id = user.id;
      }
      return token;
    },
  },
 
});

export { handler as GET, handler as POST };
