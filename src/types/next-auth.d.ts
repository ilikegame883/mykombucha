import NextAuth from "next-auth";
import { JWT } from "next-auth/jwt";
import { Session } from "next-auth";

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: User;
    provider: string;
    accessToken?: string;
    id: string;
  }

  interface User {
    name: string;
    email: string;
    profile: {
      image: string;
    };
    createdAt: Date;
    username?: string;
    id?: string;
  }

  // interface Account {
  //   access_token: string;
  // }
}

declare module "next-auth/jwt" {
  /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
  interface JWT {
    /** OpenID ID Token */
    idToken?: string;
    accessToken?: string;
    providerId?: string;
    provider: string;
    id: string;
    username: string;
    image: string;
  }
}
