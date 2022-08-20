import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import Users from "../../../src/models/userModel";
import connectDB from "./../../../src/lib/connectDB";
import bcrypt from "bcrypt";

export const authOptions = {
  session: {
    // The default is `"jwt"`, an encrypted JWT (JWE) in the session cookie.
    maxAge: 60 * 30 * 24 * 30, // 15 days
  },
  secret: process.env.SECRET,
  jwt: {
    encryption: true,
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",

      authorize: async (credentials) => {
        await connectDB();
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
        //session object by default only returns name, email, image
        //these values are additional values that will be added on to session object to client
        return {
          userid: user._id,
          username: user.username,
          avatar: user.avatar.image,
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
    //jwt callback is only called when token is created (signin)
    //When jwt callback is called, user object is available
    async jwt({ token, user, account }) {
      //if user is logged in with credentials (e-mail/pass)
      //userid is only returned from credentials provider
      if (user && user?.userid) {
        console.log("credential userrrr");

        //grab userdata from user object returned by provider and embed to token
        token._id = user.userid;
        token.username = user.username;
        token.avatar = user.avatar;
        token.provider = account.provider;
      }

      //if user is logged in with google
      if (user && !user?.userid) {
        let setOauthUserId;
        //logging in with google will not provide a username only nam
        //set new google login users a username using the e-mail address
        const setUserName = user.email.slice(0, user.email.indexOf("@"));

        //check if user data is stored in DB for google login users
        const findUser = await Users.findOne({ email: user.email });

        if (findUser) {
          console.log("found userrr");
          setOauthUserId = findUser._id;
        }

        if (!findUser) {
          console.log("new userrrrrrrrrrrrrrrrrrrrrrrrrr");
          //store user data provided by google if first time signing in
          const newUser = new Users({
            username: setUserName,
            email: user.email, //(user.email) = google email
            avatar: { image: user.image }, //(user.image = google profile image);
          });

          //save google login user data to users collection and retrieve new generated user _id
          //new users will automatically be assigned a id from DB
          await newUser.save();
          setOauthUserId = newUser._id;
        }

        //grab userdata from google profile and embed to token
        token._id = setOauthUserId;
        token.username = findUser?.username ?? setUserName;
        token.avatar = findUser?.avatar.image ?? user.image;
        token.provider = account.provider;
      }
      return token; //forwarded to session
    },
    async session({ session, token }) {
      //session object by default only returns name, email and image
      if (session) {
        // Add the updated token properties to user session obj which is available to client as http only cookie
        session.user.username = token.username;
        session.user._id = token._id;
        session.user.avatar = token.avatar;
        session.user.provider = token.provider;
      }
      //delete unused properties to prevent undefined errors
      //unstable_getServerSession() will return image: "undefined", name: "undefined" since they are default set jwt properties
      delete session.user.image;
      delete session.user.name;

      //return the session to client
      return session;
    },
  },

  pages: {
    signIn: "/signin",
    error: "/signin",
  },
};
export default NextAuth(authOptions);
