import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
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
        // Any object returned will be saved in `user` property received by JWT()
        //make sure to only return username and _id
        return {
          userid: user._id,
          username: user.username,
          avatar: user.avatar,
          email: user.email,
        };
        //return value is passed in as user to jwt callback
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      //INITIAL SIGN IN
      //Must re-login to update any changes!
      //first time jwt callback is ran, user object is available !important!
      if (user) {
        const findUser = await Users.findOne({ email: user.email });
        let oAuthUserId;

        //login with google does not provide username
        //create username using e-mail address if google is used to login
        const setUserName = user?.username
          ? user.username
          : user.email.slice(0, user.email.indexOf("@"));

        if (!findUser) {
          const newUser = new Users({
            username: setUserName,
            email: user.email,
            avatar: user.image, //(user.image = provided by google);
          });
          //save new google login user data to DB and retrieve user _id
          await newUser.save();
          oAuthUserId = newUser._id;
        }
        if (findUser) {
          oAuthUserId = findUser._id;
        }
        //grab userdata and embed to token
        token._id = user.userid || oAuthUserId;
        token.username = setUserName;
        token.avatar = user.avatar || user.image;
      }
      return token;
    },
    async session({ session, token }) {
      if (session) {
        // Add additional user properties to user session obj on client
        session.user.username = token.username;
        session.user._id = token._id;
        session.user.avatar = token.avatar;
      }
      if (session.user.image) {
        //delete image property for google login users
        delete session.user.image;
      }
      return session;
    },
  },
  jwt: {
    secret: process.env.SECRET,
    encryption: true,
  },
  pages: {
    newUser: "/newuser",
    signIn: "/signin",
    error: "/signin",
  },
});
