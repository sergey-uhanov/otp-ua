import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      /** The user's role. */
      role?: string | null;
    } & DefaultSession["user"];
  }

  interface User {
    role?: string | null;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    /** The user's role. */
    role?: string | null;
  }
}
