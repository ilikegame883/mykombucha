import NextAuth, { NextAuthOptions } from "next-auth";
import type { NextApiRequest, NextApiResponse } from "next";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import Users from "../../../src/models/userModel";
import connectDB from "../../../src/lib/connectDB";
import * as bcrypt from "bcryptjs";
import { IncomingMessage } from "http";
import clientPromise from "../../../src/lib/mongoDB";

const providers = [
  //TODO: Add Facebook Provider
  //User creation in the database is automatic when the user is logging in for the first time with a provider.
  //The default data saved is id, name, email and image from profile callback return object.
  GoogleProvider({
    clientId: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    profile(profile) {
      return {
        //must include default fields required by next-auth: id, name, email, image
        // 'id' is required to identify the account when added to a database
        //mongoDBAdaper will add these properties to the user document DB
        //return object forwarded to jwt callback
        id: profile.sub, // Google's ID
        email: profile.email,
        name: profile.name,
        createdAt: new Date(),
        profile: {
          image: profile.picture,
        },
      };
    },
  }),
  CredentialsProvider({
    name: "Credentials",
    credentials: {},
    authorize: async (credentials: { email: string; password: string }) => {
      const email = credentials.email;
      const password = credentials.password;
      //verify credentials against DB
      const user = await Users.findOne({ email });
      if (!user) {
        throw new Error("E-mail or Password is Invalid");
      }
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        throw new Error("E-mail or Password is Invalid");
      }
      return {
        id: user._id,
        username: user.username,
        email: user.email,
        profile: {
          image: user.profile.image,
        },
      } as any;
    },
  }),
];

export const authOptions = (req): NextAuthOptions => ({
  adapter: MongoDBAdapter(clientPromise),
  providers,
  secret: process.env.NEXTAUTH_SECRET,
  jwt: {
    // @ts-ignore
    encryption: true,
    secret: process.env.NEXTAUTH_SECRET,
  },
  session: {
    strategy: "jwt", //session is saved in http only cookie
  },
  callbacks: {
    //jwt callback is only called when token is created (signin)
    //When jwt callback is called, user object is available
    async jwt({ token, user, account }) {
      await connectDB();
      // Persist the OAuth access_token to the token right after signin
      if (user && account) {
        //grab userdata from user and account object forwarded by providers and embed to token
        token.provider = account.provider;
        token.id = user.id;
        token.username = user?.username || null;
        token.image = user.profile?.image || null;
      }
      // Update user data from database when api call is made
      // This allows us to update session data without having to re-authenticate
      //TODO: figure out why req.url in production adds = to the end of the url
      if (req.url === "/api/auth/session?update=") {
        //TODO: Add query params to update by individual fields
        const findUser = await Users.findOne({ _id: token.id });
        token.username = findUser.username;
        token.image = findUser.profile.image;
      }
      return token; //forwarded to session
    },

    async session({ session, token }) {
      if (session) {
        // Add token properties to user session which is available to client as http only cookie
        //session object by default only returns name, email, image
        //name not required but must delete from session to prevent error
        session.provider = token.provider;
        session.user.id = token.id;
        session.user.username = token.username;
        session.user.image = token.image;
        delete session.user.name;
      }
      //return the session to client
      return session;
    },
  },

  pages: {
    signIn: "/signin",
    error: "/404",
  },
});

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req: NextApiRequest, res: NextApiResponse) => {
  return NextAuth(req, res, authOptions(req));
};
