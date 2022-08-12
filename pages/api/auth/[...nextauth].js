import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import Users from "../../../src/models/userModel";
import connectDB from "./../../../src/lib/connectDB";
import bcrypt from "bcrypt";

connectDB();

export const authOptions = {
  session: {
    // The default is `"jwt"`, an encrypted JWT (JWE) in the session cookie.
    maxAge: 60 * 60 * 24 * 30, // 30 days
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
        // Return values are passed in as 'user' to jwt callback
        return {
          userid: user._id,
          username: user.username,
          avatar: user.avatar,
          email: user.email,
        };
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      //jwt callback is only called when token is created (signin)
      //When jwt callback is called, user object is available
      if (user) {
        const findUser = await Users.findOne({ email: user.email });
        let oAuthUserId;
        //logging in with google will not provide a username
        //set new users a username using e-mail address if google is used to signup
        const setUserName = user?.username
          ? user.username
          : user.email.slice(0, user.email.indexOf("@"));

        if (!findUser) {
          const newUser = new Users({
            username: setUserName,
            email: user.email,
            avatar: user.image, //(user.image = google profile image);
          });
          //save google login user data to DB and retrieve user _id for new users
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
      return token; //forwarded to session
    },
    async session({ session, token }) {
      if (session) {
        // Add the updated user token properties to user session obj shown to client
        session.user.username = token.username;
        session.user._id = token._id;
        session.user.avatar = token.avatar;
      }
      //delete unused properties
      //unstable_getServerSession() will return image: "undefined", name: "undefined" since they are default token properties
      delete session.user.image;
      delete session.user.name;

      //session avaiable to the client
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
};
export default NextAuth(authOptions);
