import NextAuth, { NextAuthOptions } from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import connectMongoDataBase from "@/libs/mongodb";
import User from "@/models/user";
import { GithubProfile } from "next-auth/providers/github";
import bcrypt from "bcrypt";

// untuk type
export const options: NextAuthOptions = {
  //Conf using oauth
  providers: [
    //Setting up github if you want to login using github account
    GitHubProvider({
      async profile(profile: GithubProfile) {
        await connectMongoDataBase();
        // console.log("GitHub Profiler: ", profile);
        // console.log("GitHub Login name: ", profile?.login);

        const { login, id, email, avatar_url} = profile;

        const existingUser = await User.findOne({ userId: id });
        console.log("existing user: ", existingUser)

        if (!existingUser) {
          const newUser = new User({
            userId: id,
            email: email,
            username: login,
            balanceAmount: 0,
            userRole: "buyer",
          });
          await newUser.save();

          return {
            ...profile,
            username: login,
            balanceAmount: 0, 
            role: "buyer",
            id: id.toString(),
            email: email,
            image: avatar_url,
          }; //this mean UPDATE the existing field within the profile not append or add new fields, This is Update syntax of object
        }

        return {
          ...profile,
          username: login,
          balanceAmount: existingUser?.balanceAmount,
          role: "buyer",
          id: id.toString(),
          email: email,
          image: avatar_url,
        };
      },
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
    CredentialsProvider({
      name: "credentials",
      credentials: {
        // The credentials is used to generate a suitable form on the sign in page.
        // You can specify whatever fields you are expecting to be submitted.
        // You can pass any HTML attribute to the <input> tag through the object.
        username: {
          label: "Username",
          type: "text",
          placeholder: "Your Username",
        },
        password: {
          label: "Password",
          type: "Password",
          placeholder: "Your Password",
        },
      },
      async authorize(credentials, req) {
        await connectMongoDataBase();
        // // This is where you need to retrieve user data
        // // to verify with credentials

        // const findUserBy = await User.findOne({username: credentials?.username});
        // const user = {id: `${findUserBy?.userId}`, name: `${findUserBy?.username}`, password: `${findUserBy?.password}`}
        // console.log("This is User:", user);
        // if(!user) return null
        // return {
        //   id : user.id,
        //   name : user.name
        //   /// tambah field laen
        // }

        const user = await User.findOne({ username: credentials?.username }).lean();

        const comparePass = await bcrypt.compareSync(
          credentials?.password as string,
          user?.password as string
        );
        // console.log("compareHash:", comparePass);
        console.log("Balance :", user?.balanceAmount);

        if (!user || !comparePass) return null;

        return {
          id: user.userId,
          email: user.email, //ade property userId
          username: user.username,
          balanceAmount: user?.balanceAmount,
          role: user.userRole,
          image:
            "https://media.istockphoto.com/id/871752462/vector/default-gray-placeholder-man.jpg?s=612x612&w=0&k=20&c=4aUt99MQYO4dyo-rPImH2kszYe1EcuROC6f2iMQmn8o=",
        };
      },
    }),
  ],
  // Ref: https://authjs.dev/guides/basics/role-based-access-control#persisting-the-role
  callbacks: {
    async jwt({ token, user }) {
      //the token parameter is from the user after login and token generated
      // console.log("define jwt token: ", token);
      // console.log("define balance :", user?.balanceAmount);

      if (user) {
        token.id = user.id;
        token.role = user.role;
        token.name = user.username;
      }

      // console.log("return balance:", token?.balanceAmount);
      return token;
    },
    // If you want to use the role in client components
    async session({ session, token }) {
      // console.log("define session: ", session);
      // console.log("define token from session: ", token);
      if (session?.user) {
        session.user.id = token.id;
        session.user.role = token.role;
        session.user.username = token.name;
      }
      // console.log("return session balance: ", session?.user?.balanceAmount);
      return session;
    },
    // async redirect({ url, baseUrl }) {
    //   if (url.startsWith("/")) return ``;

    //   return baseUrl;
    // },
  },
};
