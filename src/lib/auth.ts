import { prisma } from "@/prisma/client";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import * as bcrypt from "bcryptjs";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        // Check if credentials are valid
        if (!credentials) throw new Error("Credentials are required.");

        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });

        if (!user) {
          throw new Error("User not found.");
        }

        const isValidPassword = await bcrypt.compare(
          credentials.password,
          user.password,
        );

        if (!isValidPassword) {
          throw new Error("Invalid password.");
        }

        return {
          id: user.id,
          name: user.name,
          email: user.email,
        };
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  jwt: {
    maxAge: 60 * 60 * 24, // 1 day
  },
  callbacks: {
    jwt: async ({ token, user }) => {
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.email = user.email;
      }
      return token;
    },
    session: async ({ session, token }) => {
      session.user.name = token.name;
      session.user.email = token.email;
      session.user.id = token.id;
      return session;
    },
  },
};
