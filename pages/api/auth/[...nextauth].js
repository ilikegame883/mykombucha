import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import Users from "../../../src/models/userModel";
import connectDB from "./../../../src/lib/connectDB";
import bcrypt from "bcrypt";

connectDB();

export default NextAuth({
  session: {
    // The default is `"jwt"`, an encrypted JWT (JWE) in the session cookie.
    jwt: true,
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",

      authorize: async (credentials) => {
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
        // Any object returned will be saved in `user` property of the JWT
        //make sure to only return username and _id
        return {
          userid: user._id,
          username: user.username,
          avatar: user.avatar,
        };
        //return value is passed in as user to jwt callback
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      //INITIAL SIGN IN
      //Must re-login to update any changes!
      //first time jwt callback is ran, user param object is available !important!
      if (user) {
        //grab username and embed to token
        token.username = user.username;
        token._id = user.userid;
        token.avatar = user.avatar;
      }
      return token;
    },
    async session({ session, token }) {
      if (session) {
        // Add additional user properties to session returned to front-end
        session.user.username = token.username;
        session.user._id = token._id;
        session.user.avatar = token.avatar;
      }
      return session;
    },
  },
  jwt: {
    secret: process.env.SECRET,
    encryption: true,
  },
  pages: {
    signIn: "/signin",
    error: "/signin",
  },
});
