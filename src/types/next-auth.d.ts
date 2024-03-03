import { JWT } from "next-auth/jwt";
import { PermissionType } from "@prisma/client";
import NextAuth, { DefaultSession, User as NextAuthUser } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      email: string;
      name: string;
    };
  }

  // Extend the NextAuth User type
  interface User extends NextAuthUser {
    id: string;
    email: string;
    name: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    email: string;
    name: string;
  }
}
